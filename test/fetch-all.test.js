const createOne = require('../tools/crud/create-one')
const fetchAll = require('../tools/scan/fetch-all')
const buildUrl = require('../tools/base/build-url')

const logError = require('./lib/log-error')

const {
  apiVersion,
  accessToken,
  testCampaignId,
  testAdsetId,
  testAdId
} = require('../test-config')

describe('fetchAll', () => {
  test('create some ads and fetch them', logError(async () => {
    // copy adset
    const { copied_adset_id: copiedAdsetId } = await createOne({
      apiVersion,
      accessToken,
      resourcePath: `${testAdsetId}/copies`,
      params: {
        campaign_id: testCampaignId
      }
    })

    // copy ads
    const adIds = []
    const adCount = 5
    for (let i = 0; i < adCount; i++) {
      const { copied_ad_id: copiedAdId } = await createOne({
        apiVersion,
        accessToken,
        resourcePath: `${testAdId}/copies`,
        params: {
          adset_id: copiedAdsetId
        }
      })
      adIds.push(copiedAdId)
    }

    // fetch ads
    const ads = await fetchAll(buildUrl({
      apiVersion,
      accessToken,
      resourcePath: `${copiedAdsetId}/ads`,
      query: {
        limit: 2
      }
    }))

    expect(ads.length).toBe(adCount)
    expect(ads.map(ad => ad.id).sort()).toEqual(adIds.sort())
  }), 60 * 1000)
})
