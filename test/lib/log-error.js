const logger = require('simple-json-logger')

module.exports = function logError (handler) {
  return async function () {
    try {
      return await handler()
    } catch (err) {
      logger.error(err)
      throw err
    }
  }
}
