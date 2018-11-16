const axios = require('axios')
const Signal = require('await-signal')
const asAsync = require('as-async')
const isError = require('lodash.iserror')

/**
 * fetch and handle data page by page
 * it would prefetch the next page of data while handling the current one
 *
 * @param nextUrl
 * @param handler - async func(data), data is an array of items
 *
 * @return result - {results, hasError}, results is an array of which each item is the return value or thrown error of the corresponding page data handling
 */
module.exports = async function (nextUrl, handler) {
  const dataDoneSignal = new Signal(true)
  const results = []

  function handleResult(result) {
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

  while (nextUrl) {
    const response = await axios.get(nextUrl)
    const page = response.data
    const data = page.data

    await dataDoneSignal.until(true)

    handleData(data)

    if (
      page.paging.cursors
      && page.paging.cursors.before !== page.paging.cursors.after
      && page.paging.next
    ) {
      nextUrl = page.paging.next
    } else {
      nextUrl = null
    }
  }

  await dataDoneSignal.until(true)

  return {
    results,
    hasError: results.some(isError),
  }
}
