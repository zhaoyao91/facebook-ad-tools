const joinUrl = require('url-join')

const buildQueryString = require('./build-querystring')
const defaultBaseUrl = require('./base-url')

/**
 * build a facebook api url from by some params
 *
 * @param {string} [options.baseUrl]
 * @param {string} options.apiVersion
 * @param {string} options.accessToken
 * @param {string} options.resourcePath
 * @param {Object} options.query
 * @returns {string} url
 */
module.exports = function (options) {
  const {
    baseUrl = defaultBaseUrl,
    apiVersion,
    accessToken,
    resourcePath,
    query,
  } = options

  const queryString = buildQueryString({
    access_token: accessToken,
    ...query,
  })

  return joinUrl(baseUrl, apiVersion, resourcePath, '?' + queryString)
}
