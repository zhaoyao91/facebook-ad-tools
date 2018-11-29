const asAsync = require('as-async')
const flatten = require('lodash.flatten')
const isError = require('lodash.iserror')

const handleDataPage = require('./handle-data-page')

/**
 * @param url
 * @param handler - async func(data), data is just an item
 * @param failFast = false
 * @param isFailed = isError
 *
 * @return result - {results, hasError}, results is an array of value returned or error thrown in each handling of data
 */
module.exports = async function ({url, handler, failFast = false, isFailed = isError}) {
  const originalResult = await handleDataPage({
    url,
    handler: data => {
      return Promise.all(data.map(item => asAsync.run(handler, item).catch(e => e)))
    },
    failFast,
    isFailed: results => isError(results) || results.some(isFailed)
  })

  const results = flatten(originalResult.results)
  const hasError = originalResult.hasError || results.some(isError)

  return {
    results,
    hasError,
  }
}
