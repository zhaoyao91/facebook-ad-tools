const joinUrl = require('url-join')

module.exports = function ({objectId, edge}) {
  return joinUrl(objectId, edge)
}
