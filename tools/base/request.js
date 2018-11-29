const axios = require('axios')

/**
 * proxy http request via axios
 * remove heavy payload on the error
 * only keep the most useful info for debug purpose
 */
module.exports = async function (options) {
  try {
    return await axios(options)
  } catch (err) {
    delete err.config
    delete err.request

    if (err.response) {
      const { status, headers, data } = err.response
      err.response = { status, headers, data }
    }

    throw err
  }
}
