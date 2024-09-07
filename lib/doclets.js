import Doclet from './doclet.js'

class Doclets extends Array {
  options = {}

  static fromArray (arr) {
    const doclets = new this()
    for (const item of arr) {
      doclets.push(new Doclet(item))
    }
    return doclets
  }

  setOptions (options) {
    /* To globally set `private` and other dmd options */
    this.options = options
  }

  /**
   * Returns an array of the top-level elements which have no parents. Output only includes externals which have a description.
   * @returns {array}
   * @category Returns list
   */
  orphans (query = {}) {
    query.memberof = undefined
    return this.identifiers(query).filter(function (doclet) {
      if (doclet.kind === 'external') {
        return doclet.description && doclet.description.length > 0
      } else {
        return true
      }
    })
  }

  /**
   * Returns a doclets subset matching the query { searchForThis: 'value', andThis: 'value' }
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
    query.scope = 'global'
    return this.identifiers(query).filter(doclet => {
      if (doclet.kind === 'external') {
        return doclet.description && doclet.description.length > 0
      } else {
        return true
      }
    })
  }

  addGroup (identifiers, groupByFields) {
    return identifiers.map(function (i) {
      i._group = groupByFields.map(field => typeof i[field] === 'undefined' ? null : i[field])
      return i
    })
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
    identifiers = addGroup(identifiers, groupByFields)

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

export default Doclets
