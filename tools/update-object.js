const axios = require('axios')

const buildUrl = require('./build-url')

module.exports = async function (options) {
  const {
    accessToken,
    baseUrl,
    apiVersion,
    objectId,
    updates,
  } = options

  const result = await axios({
    method: 'POST',
    url: buildUrl({
      accessToken,
      baseUrl,
      apiVersion,
      resourcePath: objectId,
    }),
    data: updates
  })

  return result.data
}
