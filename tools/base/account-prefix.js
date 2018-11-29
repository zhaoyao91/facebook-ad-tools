const prefix = 'act_'

module.exports = {
  prefix,

  /**
   * ensure the id contains prefix
   *
   * @param {string} id
   * @returns {string}
   */
  yes (id) {
    return id.startsWith(prefix) ?
      id
      : prefix + id
  },

  /**
   * ensure the id does not contain prefix
   *
   * @param {string} id
   * @return {string}
   */
  no (id) {
    return id.startsWith(prefix) ?
      id.slice(prefix.length)
      : id
  }
}
