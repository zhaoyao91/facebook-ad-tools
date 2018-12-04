module.exports = {
  // base
  accountPrefix: require('./tools/base/account-prefix'),
  baseUrl: require('./tools/base/base-url'),
  buildQuerystring: require('./tools/base/build-querystring'),
  buildUrl: require('./tools/base/build-url'),
  request: require('./tools/base/request'),

  // crud
  createOne: require('./tools/crud/create-one'),
  deleteOne: require('./tools/crud/delete-one'),
  getOne: require('./tools/crud/get-one'),
  updateOne: require('./tools/crud/update-one'),

  // scan
  fetchAll: require('./tools/scan/fetch-all'),
  handleDataItem: require('./tools/scan/handle-data-item'),
  handleDataPage: require('./tools/scan/handle-data-page'),
}
