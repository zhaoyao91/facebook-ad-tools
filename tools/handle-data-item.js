const asAsync = require('as-async')
const flatten = require('lodash.flatten')
const isError = require('lodash.iserror')

const handleDataPage = require('./handle-data-page')

/**
 * @param nextUrl
 * @param handler - async func(data), data is just an item
 *
 * @return result - {results, hasError}, results is an array of value returned or error thrown in each handling of data
 */
module.exports = async function (nextUrl, handler) {
  const originalResult = await handleDataPage(nextUrl, data => {
    return Promise.all(data.map(item => asAsync.run(handler, item).catch(e => e)))
  })

  const results = flatten(originalResult.results)
  const hasError = originalResult.hasError || results.some(isError)

  return {
    results,
    hasError,
  }
}
