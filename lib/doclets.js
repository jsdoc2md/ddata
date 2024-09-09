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
    query.scope = 'global'
    return this.identifiers(query).filter(doclet => {
      if (doclet.kind === 'external') {
        return doclet.description && doclet.description.length > 0
      } else {
        return true
      }
    })
  }
}

export default Doclets
