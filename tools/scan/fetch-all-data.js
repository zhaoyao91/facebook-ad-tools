const last = require('lodash.last')

const handleDataItem = require('./handle-data-item')

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
