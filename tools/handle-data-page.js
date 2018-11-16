const axios = require('axios')
const Signal = require('await-signal')

/**
 * SO COOL!
 *
 * fetch and handle data page by page
 * it would prefetch the next page of data while handling the current one
 * this optimization could just save your life
 *
 * @param nextUrl
 * @param handler - async func(pageData)
 */
module.exports = async function (nextUrl, handler) {
  const dataDoneSignal = new Signal(true)
  let handleDataError = null

  // wrap the handler to ensure it to be executed asynchronously
  async function handleData (data) {
    return handler(data)
  }

  while (nextUrl) {
    const response = await axios.get(nextUrl)
    const page = response.data
    const data = page.data

    await dataDoneSignal.until(true)
    if (handleDataError) throw handleDataError

    dataDoneSignal.state = false
    handleData(data)
      .catch(err => {
        handleDataError = err
      })
      .finally(() => {
        dataDoneSignal.state = true
      })

    if (
      page.paging.cursors
      && page.paging.cursors.before !== page.paging.cursors.after
      && page.paging.next
    ) {
      nextUrl = page.paging.next
    } else {
      nextUrl = null
    }
  }

  await dataDoneSignal.until(true)
}