const accountPrefix = require('../tools/base/account-prefix')
const getOne = require('../tools/crud/get-one')
const createOne = require('../tools/crud/create-one')
const deleteOne = require('../tools/crud/delete-one')

const logError = require('./lib/log-error')

const {
  apiVersion,
  accessToken,
  testAccountId,
  testAdsetId,
  testAdId
} = require('../test-config')

describe('deleteAd', () => {
  test('create and delete an ad', logError(async () => {
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

    // delete new ad
    const deleteResult = await deleteOne({
      apiVersion,
      accessToken,
      objectId: newAdId
    })
    expect(deleteResult).toEqual({ success: true })

    // get new ad
    const newAd = await getOne({
      apiVersion,
      accessToken,
      objectId: newAdId,
      fields: ['effective_status']
    })

    // check new ad
    expect(newAd.effective_status).toBe('DELETED')
  }), 60 * 1000)
})
