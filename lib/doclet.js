const commonSequence = require('common-sequence')

let malformedDataWarningIssued = false

function deepEqual (a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

class Doclet {

  constructor (doclet) {
    Object.assign(this, doclet)
  }

  isClass () { return this.kind === 'class' }
  isClassMember (doclets) {
    const parent = doclets.find(i => i.id === this.memberof)
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

  setLevel (level) {
    this.level = level
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
        console.warn('Jsdoc data looks malformed. Typically, this can be fixed by ensuring the sourcecode file has a `@module tag`. ')
        console.warn('Please see the "Document an ES2015 module" section in the wiki')
        console.warn('https://github.com/jsdoc2md/jsdoc-to-markdown/wiki')
        malformedDataWarningIssued = true
      }
      return []
    }
    if (!this.id) return []
    const min = query.min
    delete query.min
    query.memberof = this.id
    let output = doclets.identifiers(query)
    output = output.filter(doclet => {
      if (doclet.kind === 'external') {
        return doclet.description && doclet.description.length > 0
      /* @hideconstructor support: https://github.com/jsdoc2md/dmd/issues/94 */
      } else if (this.hideconstructor === true) {
        return doclet.kind !== 'constructor'
      } else {
        return true
      }
    })
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
    const min = typeof query.min !== 'undefined' ? query.min : 2
    delete query.min
    query.memberof = this.id
    const output = []
    const iterate = (childrenList) => {
      if (childrenList.length) {
        for (const child of childrenList) {
          output.push(child)
          iterate(child.children(doclets))
        }
      }
    }
    iterate(this.children(doclets, { memberof: this.id }))
    if (output.length >= (min || 0)) return output
  }

  addGroup (identifiers, groupByFields) {
    return identifiers.map(function (i) {
      i._group = groupByFields.map(field => typeof i[field] === 'undefined' ? null : i[field])
      return i
    })
  }

  groupChildren (groupByFields, doclets, query) {
    const children = this.children(doclets, query)
    return this.groupBy(children, groupByFields)
  }

  /**
   * takes the children of this, groups them, inserts group headings..
   */
  groupBy (identifiers, groupByFields) {
    /* don't modify the input array */
    groupByFields = groupByFields.slice(0)

    for (const group of groupByFields) {
      let groupValues = identifiers
        /* exclude constructors from grouping.. re-implement to work off a `null` group value */
        .filter(i => i.kind !== 'constructor')
        .map(i => i[group])
      groupValues = Array.from(new Set(groupValues)) // unique
      if (groupValues.length <= 1) groupByFields = groupByFields.filter(g => g !== group)
    }
    identifiers = this.addGroup(identifiers, groupByFields)

    const inserts = []
    let prevGroup = []
    let level = 0

    for (const [index, identifier] of identifiers.entries()) {
      if (!deepEqual(identifier._group, prevGroup)) {
        const common = commonSequence(identifier._group, prevGroup)
        level = common.length
        identifier._group.forEach(function (group, i) {
          if (group !== common[i] && group !== null) {
            inserts.push({
              index,
              _title: group,
              level: level++
            })
          }
        })
      }
      identifier.level = level
      prevGroup = identifier._group
      delete identifier._group
    }

    /* insert title items */
    inserts.reverse().forEach(function (insert) {
      identifiers.splice(insert.index, 0, { _title: insert._title, level: insert.level })
    })
    return identifiers
  }
}

export default Doclet
