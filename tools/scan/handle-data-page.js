const Signal = require('await-signal')
const asAsync = require('as-async')
const isError = require('lodash.iserror')
const last = require('lodash.last')

const request = require('../base/request')

/**
 * handle all data pages in a url-chain one by one
 * it would prefetch the next page of data while handling the current one
 *
 * @param {string} url - the leading url
 * @param {function} handler - async func(data: Array) => any, data is an array of items, the function could return a result or throw an error
 *
 * @param {boolean} [failFast=false] - Advanced option, if true, the function would return on the first failure, otherwise it would keep running and collect all results
 * @param {function} [isFailed=isError] - Advanced option, func(result: any) => bool, tell if the result indicates a failure
 *
 * @return {Object} result - {results, hasError}, results is an array of value returned or error thrown in each handling of a page of data
 */
module.exports = async function ({ url, handler, failFast = false, isFailed = isError }) {
  const dataDoneSignal = new Signal(true)
  const results = []

  function handleResult (result) {
    results.push(result)
  }

  function handleData (data) {
    if (!Array.isArray(data)) {
      handleResult(new TypeError('data is not an array'))
      return
    }

    dataDoneSignal.state = false
    asAsync.run(handler, data).then(handleResult).catch(handleResult).finally(() => {
      dataDoneSignal.state = true
    })
  }

  while (url) {
    let page
    let data

    try {
      const response = await request({
        method: 'GET',
        url
      })
      page = response.data
      data = page.data
    } catch (err) {
      await dataDoneSignal.until(true)
      handleResult(err)
      break
    }

    await dataDoneSignal.until(true)

    if (failFast && results.length > 0 && isFailed(last(results))) {
      break
    }

    handleData(data)

    if (page.paging && page.paging.next) {
      url = page.paging.next
    } else {
      url = null
    }
  }

  await dataDoneSignal.until(true)

  return {
    results,
    hasError: results.some(isError),
  }
}
