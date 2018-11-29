const request = require('../../lib/request')
const buildUrl = require('../base/build-url')

/**
 * update an object
 *
 * @param {string} [options.baseUrl]
 * @param {string} options.apiVersion
 * @param {string} options.accessToken
 * @param {string} options.objectId
 * @param {Object} options.params
 * @returns {Object} result
 */
module.exports = async function (options) {
  const {
    baseUrl,
    apiVersion,
    accessToken,
    objectId,
    params,
  } = options

  const result = await request({
    method: 'POST',
    url: buildUrl({
      accessToken,
      baseUrl,
      apiVersion,
      resourcePath: objectId,
    }),
    data: params
  })

  return result.data
}
