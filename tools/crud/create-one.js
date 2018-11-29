const request = require('../../lib/request')
const buildUrl = require('../base/build-url')

module.exports = async function (options) {
  const {
    baseUrl,
    apiVersion,
    accessToken,
    resourcePath,
    params,
  } = options

  const result = await request({
    method: 'POST',
    url: buildUrl({
      accessToken,
      baseUrl,
      apiVersion,
      resourcePath,
    }),
    data: params
  })

  return result.data
}
