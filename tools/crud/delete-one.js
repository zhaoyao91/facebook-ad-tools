const request = require('../base/request')
const buildUrl = require('../base/build-url')

/**
 * delete an object
 *
 * @param {string} [options.baseUrl]
 * @param {string} options.apiVersion
 * @param {string} options.accessToken
 * @param {string} options.objectId
 * @returns {Object} result
 */
module.exports = async function (options) {
  const {
    baseUrl,
    apiVersion,
    accessToken,
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
