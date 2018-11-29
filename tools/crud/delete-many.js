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
    method: 'DELETE',
    url: buildUrl({
      baseUrl,
      apiVersion,
      accessToken,
      resourcePath,
    }),
    data: params
  })

  return result.data
}
