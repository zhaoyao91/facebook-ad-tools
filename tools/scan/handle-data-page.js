const axios = require('axios')
const Signal = require('await-signal')
const asAsync = require('as-async')
const isError = require('lodash.iserror')
const last = require('lodash.last')

/**
 * fetch and handle data page by page
 * it would prefetch the next page of data while handling the current one
 *
 * @param url
 * @param handler - async func(data), data is an array of items
 * @param failFast = false
 * @param isFailed = isError
 *
 * @return result - {results, hasError}, results is an array of which each item is the return value or thrown error of the corresponding page data handling
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
      const response = await axios.get(url)
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
