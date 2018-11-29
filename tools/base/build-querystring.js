const qs = require('querystring')

/**
 * build a query string from a query object
 *
 * @param {Object} queryObject
 * @returns {string}
 */
module.exports = function (queryObject) {
  const body = {}
  Object.keys(queryObject).forEach(key => {
    if (typeof queryObject[key] === 'string') {
      body[key] = queryObject[key]
    } else {
      body[key] = JSON.stringify(queryObject[key])
    }
  })
  return qs.stringify(body)
}
