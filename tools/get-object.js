const axios = require('axios')

const buildUrl = require('./base/build-url')

module.exports = async function (options) {
  const {
    accessToken,
    baseUrl,
    apiVersion,
    objectId,
    fields,
  } = options

  const result = await axios({
    method: 'GET',
    url: buildUrl({
      accessToken,
      baseUrl,
      apiVersion,
      resourcePath: objectId,
      query: {
        fields: fields.join(',')
      }
    }),
  })

  return result.data
}
