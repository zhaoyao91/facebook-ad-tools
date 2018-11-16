const axios = require('axios')

const buildUrl = require('./build-url')

module.exports = async function (options) {
  const {
    accessToken,
    baseUrl,
    apiVersion,
    objectId,
  } = options

  const result = await axios({
    method: 'DELETE',
    url: buildUrl({
      accessToken,
      baseUrl,
      apiVersion,
      resourcePath: objectId,
    })
  })

  return result.data
}
