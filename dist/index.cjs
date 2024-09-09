'use strict';

const commonSequence = require('common-sequence');

let malformedDataWarningIssued = false;

function deepEqual (a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

class Doclet {

  constructor (doclet) {
    Object.assign(this, doclet);
  }

  isClass () { return this.kind === 'class' }
  isClassMember (doclets) {
    const parent = doclets.find(i => i.id === this.memberof);
    if (parent) {
      return parent.kind === 'class'
    }
  }

  isConstructor () { return this.kind === 'constructor' }
  isFunction () { return this.kind === 'function' }
  isConstant () { return this.kind === 'constant' }
  isEvent () { return this.kind === 'event' }
  /* Renamed to avoid clash with jsdoc-parse `isEnum` property */
  isEnumKind () { return this.isEnum || this.kind === 'enum' }
  isExternal () { return this.kind === 'external' }
  isTypedef () {
    return this.kind === 'typedef' && this.type.names[0] !== 'function'
  }

  isCallback () {
    return this.kind === 'typedef' && this.type.names[0] === 'function'
  }

  isModule () { return this.kind === 'module' }
  isMixin () { return this.kind === 'mixin' }
  isPrivate () { return this.access === 'private' }
  isProtected () { return this.access === 'protected' }

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
  anchorName (options) {
    if (!this.id) throw new Error('[anchorName helper] cannot create a link without a id: ' + JSON.stringify(this))
    if (this.inherited) {
      options.hash.id = this.inherits;
      const inherits = _identifier(options);
      if (inherits) {
        return anchorName.call(inherits, options)
      } else {
        return ''
      }
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
   * Returns the method signature, e.g. `(options, [onComplete])`
   * @returns {string}
   */
  methodSig () {
    return arrayify(this.params).filter(function (param) {
      return param.name && !/\./.test(param.name)
    }).map(function (param) {
      if (param.variable) {
        return param.optional ? '[...' + param.name + ']' : '...' + param.name
      } else {
        return param.optional ? '[' + param.name + ']' : param.name
      }
    }).join(', ')
  }

  /**
   * returns the parent name, instantiated if necessary
   * @returns {string}
   */
  parentName (options) {
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

    if (this.memberof && this.kind !== 'constructor') {
      const parent = arrayify(options.data.root).find(d => d.id === this.memberof);
      if (parent) {
        if (this.scope === 'instance') {
          const name = parent.typicalname || parent.name;
          return instantiate(name)
        } else if (this.scope === 'static' && !(parent.kind === 'class' || parent.kind === 'constructor')) {
          return parent.typicalname || parent.name
        } else {
          return parent.name
        }
      } else {
        return this.memberof
      }
    }
  }

  setLevel (level) {
    this.level = level;
  }

  /**
   * returns a more appropriate 'kind', depending on context
   * @return {string}
   */
  kindInThisContext (options) {
    if (this.kind === 'function' && this.memberof) {
      return 'method'
    } else if (this.kind === 'member' && !this.isEnum && this.memberof) {
      return 'property'
    } else if (this.kind === 'member' && this.isEnum && this.memberof) {
      return 'enum property'
    } else if (this.kind === 'member' && this.isEnum && !this.memberof) {
      return 'enum'
    } else if (this.kind === 'member' && this.scope === 'global') {
      return 'variable'
    } else {
      return this.kind
    }
  }

  /**
   * return a doclets subset which are a `memberof` this one. Exclude externals without descriptions.
   * @param [sortBy] {string} - "kind"
   * @param [min] {number} - only returns if there are `min` children
   * @this {identifier}
   * @returns {identifier[]}
   * @static
   */
  children (doclets, query = {}) {
    if (this.id && this.memberof && this.id === this.memberof) {
      if (!malformedDataWarningIssued) {
        console.warn('Jsdoc data looks malformed. Typically, this can be fixed by ensuring the sourcecode file has a `@module tag`. ');
        console.warn('Please see the "Document an ES2015 module" section in the wiki');
        console.warn('https://github.com/jsdoc2md/jsdoc-to-markdown/wiki');
        malformedDataWarningIssued = true;
      }
      return []
    }
    if (!this.id) return []
    const min = query.min;
    delete query.min;
    query.memberof = this.id;
    let output = doclets.identifiers(query);
    output = output.filter(doclet => {
      if (doclet.kind === 'external') {
        return doclet.description && doclet.description.length > 0
      /* @hideconstructor support: https://github.com/jsdoc2md/dmd/issues/94 */
      } else if (this.hideconstructor === true) {
        return doclet.kind !== 'constructor'
      } else {
        return true
      }
    });
    if (output.length >= (min || 0)) return output
  }

  /**
   * return a flat list containing all decendants (children of children etc).
   * @param [sortBy] {string} - "kind"
   * @param [min] {number} - only returns if there are `min` children
   * @this {identifier}
   * @returns {identifier[]}
   */
  descendants (doclets, query = {}) {
    const min = typeof query.min !== 'undefined' ? query.min : 2;
    delete query.min;
    query.memberof = this.id;
    const output = [];
    const iterate = (childrenList) => {
      if (childrenList.length) {
        for (const child of childrenList) {
          output.push(child);
          iterate(child.children(doclets));
        }
      }
    };
    iterate(this.children(doclets, { memberof: this.id }));
    if (output.length >= (min || 0)) return output
  }

  addGroup (identifiers, groupByFields) {
    return identifiers.map(function (i) {
      i._group = groupByFields.map(field => typeof i[field] === 'undefined' ? null : i[field]);
      return i
    })
  }

  groupChildren (groupByFields, doclets, query) {
    const children = this.children(doclets, query);
    return this.groupBy(children, groupByFields)
  }

  /**
   * takes the children of this, groups them, inserts group headings..
   */
  groupBy (identifiers, groupByFields) {
    /* don't modify the input array */
    groupByFields = groupByFields.slice(0);

    for (const group of groupByFields) {
      let groupValues = identifiers
        /* exclude constructors from grouping.. re-implement to work off a `null` group value */
        .filter(i => i.kind !== 'constructor')
        .map(i => i[group]);
      groupValues = Array.from(new Set(groupValues)); // unique
      if (groupValues.length <= 1) groupByFields = groupByFields.filter(g => g !== group);
    }
    identifiers = this.addGroup(identifiers, groupByFields);

    const inserts = [];
    let prevGroup = [];
    let level = 0;

    for (const [index, identifier] of identifiers.entries()) {
      if (!deepEqual(identifier._group, prevGroup)) {
        const common = commonSequence(identifier._group, prevGroup);
        level = common.length;
        identifier._group.forEach(function (group, i) {
          if (group !== common[i] && group !== null) {
            inserts.push({
              index,
              _title: group,
              level: level++
            });
          }
        });
      }
      identifier.level = level;
      prevGroup = identifier._group;
      delete identifier._group;
    }

    /* insert title items */
    inserts.reverse().forEach(function (insert) {
      identifiers.splice(insert.index, 0, { _title: insert._title, level: insert.level });
    });
    return identifiers
  }
}

class Doclets extends Array {
  options = {}

  static fromArray (arr) {
    const doclets = new this();
    for (const item of arr) {
      doclets.push(new Doclet(item));
    }
    return doclets
  }

  setOptions (options) {
    /* To globally set `private` and other dmd options */
    this.options = options;
  }

  /**
   * Returns an array of the top-level elements which have no parents. Output only includes externals which have a description.
   * @returns {array}
   * @category Returns list
   */
  orphans (query = {}) {
    query.memberof = undefined;
    return this.identifiers(query).filter(function (doclet) {
      if (doclet.kind === 'external') {
        return doclet.description && doclet.description.length > 0
      } else {
        return true
      }
    })
  }

  /**
   * Returns a doclets subset matching the query { searchForThis: 'value', andThis: 'value' }.
   * TODO: rename to `.filterWhere()` or similar.
   * @returns {array}
   */
  identifiers (query) {
    return this
      .filter(doclet => {
        return Object.keys(query).every(prop => doclet[prop] === query[prop])
      })
      .filter(doclet => {
        return !doclet.ignore && (this.options.private ? true : doclet.access !== 'private')
      })
  }

  /**
   * Returns identifiers with scope='global'. Additionally, omits externals without a description.
   */
  globals (query = {}) {
    query.scope = 'global';
    return this.identifiers(query).filter(doclet => {
      if (doclet.kind === 'external') {
        return doclet.description && doclet.description.length > 0
      } else {
        return true
      }
    })
  }
}

exports.Doclet = Doclet;
exports.Doclets = Doclets;
