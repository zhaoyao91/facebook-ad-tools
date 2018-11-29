const last = require('lodash.last')

const handleDataItem = require('./handle-data-item')

/**
 * fetch all data items in a url-chain
 *
 * @param {string} url - the leading url
 * @returns {Array} items
 */
module.exports = async function (url) {
  const result = await handleDataItem({
    url,
    handler: x => x,
    failFast: true
  })

  if (result.hasError) {
    throw last(result.results)
  }

  return result.results
}
