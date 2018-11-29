const accountPrefix = require('../tools/base/account-prefix')
const getOne = require('../tools/crud/get-one')
const createOne = require('../tools/crud/create-one')

const logError = require('./lib/log-error')

const {
  apiVersion,
  accessToken,
  testAccountId,
  testAdsetId,
  testAdId
} = require('../test-config')

describe('createAd', () => {
  test('create an ad', logError(async () => {
    // get source ad
    const sourceAd = await getOne({
      apiVersion,
      accessToken,
      objectId: testAdId,
      fields: ['creative']
    })

    // create new ad
    const newAdName = `test ad ${Math.random()}`
    const { id: newAdId } = await createOne({
      apiVersion,
      accessToken,
      resourcePath: `${accountPrefix.yes(testAccountId)}/ads`,
      params: {
        adset_id: testAdsetId,
        name: newAdName,
        status: 'PAUSED',
        creative: { creative_id: sourceAd.creative.id }
      }
    })

    // get new ad
    const newAd = await getOne({
      apiVersion,
      accessToken,
      objectId: newAdId,
      fields: ['name']
    })

    // check new ad
    expect(newAd.name).toBe(newAdName)
  }))
})
