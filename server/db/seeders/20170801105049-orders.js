'use strict'

var Faker = require('faker')
var _ = require('lodash')
var Db = require('../../models')
var nums = [ 4, 5, 6 ]
var plans = ["basic", "standard", "premium"]
var stati = ['pending', 'filming', 'processing', 'delivered', 'accepted', 'rejected']
const UserDb = Db.sequelize.models.user
const zipCodes = [
    ["92675", 33.501694, -117.662552], ["92627", 33.641132, -117.918671],
    ["92672", 33.426971, -117.611992], ["92840", 33.835293, -117.914505],
    ["92630", 33.650066, -117.693100], ["92626", 33.641132, -117.918671],
    ["92802", 33.812511, -117.918976], ["94105", 37.773972, -122.431297],
    ["91945", 32.715736, -117.161087], ["90808", 33.792461, -118.185005]
  ]

module.exports = {
  up: function (queryInterface, Sequelize) {

    return UserDb.findAll({where: {type: 'agent'}}).then((res) => {
      var orders = new Array()

      _.each(res, (user) => {
        var agentId = user.dataValues.id
        var num_of_orders = _.sample(nums)
        _.times(num_of_orders,() => {
          var area = _.sample(zipCodes)
          orders.push(Db.sequelize.models.order.create({
            plan: _.sample(plans),
            status: _.sample(stati),
            agentId: agentId,
            createdAt: new Date(),
            updatedAt: new Date(),
            address: {
              zipCode: area[0],
              lat: area[1],
              lng: area[2],
              address1: Faker.address.streetAddress(),
              city: Faker.address.city(),
              state: Faker.address.state(),
            }
          }, {include: [Db.sequelize.models.address]}))
        })
      })
      return Promise.all(orders)
      // return queryInterface.bulkInsert('orders', orders, {include: [Db.sequelize.models.address]})
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('orders', null, {})
  }
}
