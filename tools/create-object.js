const axios = require('axios')

const buildUrl = require('./base/build-url')

module.exports = async function (options) {
  const {
    accessToken,
    baseUrl,
    apiVersion,
    resourcePath,
    object,
  } = options

  const result = await axios({
    method: 'POST',
    url: buildUrl({
      accessToken,
      baseUrl,
      apiVersion,
      resourcePath,
    }),
    data: object
  })

  return result.data
}
