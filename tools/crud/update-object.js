const request = require('../../lib/request')
const buildUrl = require('../base/build-url')

module.exports = async function (options) {
  const {
    accessToken,
    baseUrl,
    apiVersion,
    objectId,
    updates,
  } = options

  const result = await request({
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
