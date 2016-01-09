'use strict'
var a = require('array-tools')
var util = require('util')
var i18n = require('i18n-tools')
i18n.load(require('dmd-locale-en-gb'))
var _ = i18n._

module.exports = Identifier

function Identifier (identifier) {
  for (var prop in identifier) {
    this[prop] = identifier[prop]
  }
}

/**
@this {identifier}
@returns {boolean}
@alias module:ddata.isClass
*/
Identifier.prototype.isClass = function () { return this.kind === 'class'; }

/**
returns true if the parent of the current identifier is a class
@returns {boolean}
@static
*/
Identifier.prototype.isClassMember = function (options) {
  var parent = a.findWhere(options.data.root, { id: this.memberof })
  if (parent) {
    return parent.kind === 'class'
  }
}
Identifier.prototype.isConstructor = function () { return this.kind === 'constructor'; }
Identifier.prototype.isFunction = function () { return this.kind === 'function'; }
Identifier.prototype.isNamespace = function () { return this.kind === 'namespace'; }
Identifier.prototype.isConstant = function () { return this.kind === 'constant'; }
/**
returns true if this is an event
@returns {boolean}
@static
*/
Identifier.prototype.isEvent = function () { return this.kind === 'event'; }
Identifier.prototype.isExternal = function () { return this.kind === 'external'; }
Identifier.prototype.isTypedef = function () {
  return this.kind === 'typedef' && this.type.names[0] !== 'function'
}
Identifier.prototype.isCallback = function () {
  return this.kind === 'typedef' && this.type.names[0] === 'function'
}
Identifier.prototype.isModule = function () { return this.kind === 'module'; }
Identifier.prototype.isMixin = function () { return this.kind === 'mixin'; }
Identifier.prototype.isPrivate = function () { return this.access === 'private'; }
Identifier.prototype.isProtected = function () { return this.access === 'protected'; }

/**
@param [options.no-gfm] 
@param [options.identifiers] 
@returns {object}
*/
Identifier.prototype.sig = function (options) {
  options = options || {}
  var data = {}
  data.prefix = this.isConstructor() ? 'new' : ''
  data.parent = null
  data.accessSymbol = null
  data.name = this.isEvent() ? '"' + this.name + '"' : this.name
  data.methodSign = null
  data.returnSymbol = null
  data.returnTypes = null
  data.suffix = this.isExported ? _('symbol.exported') : this.isPrivate() ? _('symbol.private') : ''
  data.depOpen = null
  data.depClose = null
  data.codeOpen = null
  data.codeClose = null

  var mSig = this.methodSig()
  if (this.isConstructor() || this.isFunction()) {
    data.methodSign = '(' + mSig + ')'
  } else if (this.isEvent()) {
    if (mSig) data.methodSign = '(' + mSig + ')'
  }

  if (!this.isEvent()) {
    data.parent = this.parentName()
    data.accessSymbol = (this.scope === 'static' || this.scope === 'instance') ? '.' : this.scope === 'inner' ? '~' : ''
  }

  if (!this.isConstructor()) {
    if (this.returns) {
      data.returnSymbol = _('symbol.returns')
      var typeNames = a.arrayify(this.returns)
        .map(function (ret) {
          return ret.type && ret.type.names
        })
        .filter(function (name) {
          return name
        })
      if (typeNames.length) {
        data.returnTypes = a.flatten(typeNames)
      }
    } else if ((this.type || this.isNamespace()) && !this.isEvent()) {
      data.returnSymbol = _('symbol.type')

      if (this.isEnum) {
        data.returnTypes = [ 'enum' ]
      } else if (this.isNamespace()) {
        data.returnTypes = [ 'object' ]
      } else {
        data.returnTypes = this.type.names
      }
    } else if (this.chainable) {
      data.returnSymbol = _('symbol.chainable')
    } else if (this.augments) {
      data.returnSymbol = _('symbol.extends')
      data.returnTypes = [this.augments[0]]
    }
  }

  if (this.deprecated) {
    if (options['no-gfm']) {
      data.depOpen = '<del>'
      data.depClose = '</del>'
    } else {
      data.depOpen = '~~'
      data.depClose = '~~'
    }
  }

  if (options['name-format'] && !this.isClass() && !this.isModule()) {
    data.codeOpen = '`'
    data.codeClose = '`'
  }

  return data
}

/**
returns the parent name, instantiated if necessary
@returns {string}
*/
Identifier.prototype.parentName = function () {
  function instantiate (input) {
    if (/^[A-Z]{3}/.test(input)) {
      return input.replace(/^([A-Z]+)([A-Z])/, function (str, p1, p2) {
        return p1.toLowerCase() + p2
      })
    } else {
      return input.charAt(0).toLowerCase() + input.slice(1)
    }
  }

  /* don't bother with a parentName for exported identifiers */
  if (this.isExported) return ''

  if (this.memberof && !this.isConstructor()) {
    var parent = this.identifiers && this.identifiers.findWhere({ id: this.memberof })
    if (parent) {
      var name = parent.typicalname || parent.name
      return this.scope === 'instance' ? instantiate(name) : name
    } else {
      return this.memberof
    }
  }
}

/**
Returns the method signature, e.g. `(options, [onComplete])`
@returns {string}
*/
Identifier.prototype.methodSig = function () {
  return a.arrayify(this.params).filter(function (param) {
    return param.name && !/\w+\.\w+/.test(param.name)
  }).map(function (param) {
    if (param.variable) {
      return param.optional ? '[...' + param.name + ']' : '...' + param.name
    } else {
      return param.optional ? '[' + param.name + ']' : param.name
    }
  }).join(', ')
}

/**
returns a unique ID string suitable for use as an `href`.
@this {identifier}
@returns {string}
@static
@category Returns string
@example
```js
> ddata.anchorName.call({ id: "module:yeah--Yeah()" })
'module_yeah--Yeah_new'
```
*/
Identifier.prototype.anchorName = function () {
  if (!this.id) throw new Error('[anchorName helper] cannot create a link without a id: ' + JSON.stringify(this, null, '  '))
  if (this.inherited) {
    return this.identifiers.findWhere({ longname: this.inherits }).anchorName()
  }
  return util.format(
    '%s%s%s',
    this.isExported ? 'exp_' : '',
    this.kind === 'constructor' ? 'new_' : '',
    this.id
      .replace(/:/g, '_')
      .replace(/~/g, '..')
      .replace(/\(\)/g, '_new')
      .replace(/#/g, '+')
  )
}

/**
return the identifiers which are a `memberof` this one. Exclude externals without descriptions.
@returns {identifier[]}
*/
Identifier.prototype.children = function () {
  // console.error(this.identifiers.val())
  if (!this.id) return []
  return this.identifiers.where({ memberof: this.id, inherited: undefined }).filter(function (identifier) {
    if (identifier.isExternal()) {
      return identifier.description && identifier.description.length > 0
    } else {
      return true
    }
  }).val()
}
