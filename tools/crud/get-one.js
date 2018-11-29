const request = require('../base/request')
const buildUrl = require('../base/build-url')

/**
 * get an object
 *
 * @param {string} [options.baseUrl]
 * @param {string} options.apiVersion
 * @param {string} options.accessToken
 * @param {string} options.objectId
 * @param {Array<string>} options.fields
 * @returns {Object} object
 */
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
