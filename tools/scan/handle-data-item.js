const asAsync = require('as-async')
const flatten = require('lodash.flatten')
const isError = require('lodash.iserror')

const handleDataPage = require('./handle-data-page')

/**
 * handle all data items in a url-chain one by one
 *
 * @param {string} url - the leading url
 * @param {function} handler - async func(data: any) => any, data is a data item, the function could return a result or throw an error
 *
 * @param {boolean} [failFast=false] - Advanced option, if true, the function would return on the first failure, otherwise it would keep running and collect all results
 * @param {function} [isFailed=isError] - Advanced option, func(result: any) => bool, tell if the result indicates a failure
 *
 * @return {Object} result - {results, hasError}, results is an array of value returned or error thrown in each handling of data
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
