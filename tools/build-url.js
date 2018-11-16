const joinUrl = require('url-join')

const buildQueryString = require('./build-querystring')
const defaultBaseUrl = require('./base-url')

/**
 * @param options.baseUrl
 * @param options.apiVersion
 * @param options.resourcePath
 * @param options.query
 * @param options.accessToken
 * @returns {string} url
 */
module.exports = function (options) {
  const {
    baseUrl = defaultBaseUrl,
    apiVersion,
    resourcePath,
    query,
    accessToken,
  } = options

  const queryString = buildQueryString({
    access_token: accessToken,
    ...query,
  })

  return joinUrl(baseUrl, apiVersion, resourcePath, '?' + queryString)
}
