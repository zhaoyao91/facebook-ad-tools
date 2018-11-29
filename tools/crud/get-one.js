const request = require('../../lib/request')
const buildUrl = require('../base/build-url')

module.exports = async function (options) {
  const {
    baseUrl,
    apiVersion,
    accessToken,
    objectId,
    fields,
  } = options

  const result = await request({
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