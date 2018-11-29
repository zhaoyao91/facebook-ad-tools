const request = require('../../lib/request')
const buildUrl = require('../base/build-url')

module.exports = async function (options) {
  const {
    accessToken,
    baseUrl,
    apiVersion,
    objectId,
  } = options

  const result = await request({
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
