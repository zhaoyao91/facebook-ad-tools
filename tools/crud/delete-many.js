const request = require('../../lib/request')
const buildUrl = require('../base/build-url')

/**
 * delete many objects
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
