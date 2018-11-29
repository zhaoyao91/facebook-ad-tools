const joinUrl = require('url-join')

const buildQueryString = require('./build-querystring')
const defaultBaseUrl = require('./base-url')

/**
 * @param options.accessToken
 * @param options.baseUrl
 * @param options.apiVersion
 * @param options.resourcePath
 * @param options.query
 * @returns {string} url
 */
module.exports = function (options) {
  const {
    accessToken,
    baseUrl = defaultBaseUrl,
    apiVersion,
    resourcePath,
    query,
  } = options

  const queryString = buildQueryString({
    access_token: accessToken,
    ...query,
  })

  return joinUrl(baseUrl, apiVersion, resourcePath, '?' + queryString)
}
