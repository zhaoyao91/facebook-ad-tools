const request = require('../../lib/request')
const buildUrl = require('../base/build-url')

/**
 * create an object
 *
 * @param {string} [options.baseUrl]
 * @param {string} options.apiVersion
 * @param {string} options.accessToken
 * @param {string} options.resourcePath
 * @param {Object} options.params
 * @returns {Object} result
 */
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
