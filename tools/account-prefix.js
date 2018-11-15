const prefix = 'act_'

module.exports = {
  prefix,

  add (id) {
    return id.startsWith(prefix) ?
      id
      : prefix + id
  },

  remove (id) {
    return id.startsWith(prefix) ?
      id.slice(prefix.length)
      : id
  }
}
