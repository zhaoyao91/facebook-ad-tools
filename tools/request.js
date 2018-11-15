const axios = require('axios')

const buildUrl = require('./build-url')

module.exports = function (options) {
  const {
    method = 'GET',
    apiVersion,
    accessToken,
    objectId,
    edge,
    query,
    body
  } = options

  const url = buildUrl({
    apiVersion,
    accessToken,
    objectId,
    edge,
    query
  })

  return axios({
    method,
    url,
    data: body
  })
}
