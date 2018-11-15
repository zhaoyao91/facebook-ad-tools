const joinUrl = require('url-join')

const buildResourcePath = require('./build-resource-path')
const buildQueryString = require('./build-querystring')
const baseUrl = require('./base-url')

module.exports = function (options) {
  const {
    apiVersion,
    accessToken,
    objectId,
    edge,
    query
  } = options

  const queryString = buildQueryString({
    access_token: accessToken,
    ...query,
  })

  const resourcePath = buildResourcePath({objectId, edge})

  return joinUrl(baseUrl, apiVersion, resourcePath, '?' + queryString)
}
