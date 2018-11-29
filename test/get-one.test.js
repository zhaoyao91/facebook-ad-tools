const getOne = require('../tools/crud/get-one')

const logError = require('./lib/log-error')

const {
  apiVersion,
  accessToken,
  testAdsetId,
  testAdId
} = require('../test-config')

describe('getOne', () => {
  test('get the test ad', logError(async () => {
    const ad = await getOne({
      apiVersion,
      accessToken,
      objectId: testAdId,
      fields: ['adset_id']
    })

    expect(ad.adset_id).toBe(testAdsetId)
  }))
})
