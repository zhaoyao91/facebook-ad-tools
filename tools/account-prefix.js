const prefix = 'act_'

module.exports = {
  prefix,

  yes (id) {
    return id.startsWith(prefix) ?
      id
      : prefix + id
  },

  no (id) {
    return id.startsWith(prefix) ?
      id.slice(prefix.length)
      : id
  }
}
