'use strict'

var Faker = require('faker')
var _ = require('lodash')
var Db = require('../../models')
const OrderDb = Db.sequelize.models.order
const UserDb = Db.sequelize.models.user
const zipCodes = [
    ["92675", 33.501694, -117.662552], ["92627", 33.641132, -117.918671],
    ["92672", 33.426971, -117.611992], ["92840", 33.835293, -117.914505],
    ["92630", 33.650066, -117.693100], ["92626", 33.641132, -117.918671],
    ["92802", 33.812511, -117.918976], ["94105", 37.773972, -122.431297],
    ["91945", 32.715736, -117.161087], ["90808", 33.792461, -118.185005]
  ]

module.exports = {
  up: async function (queryInterface, Sequelize) {

    var addresses = new Array()
    const pilots = await  UserDb.findAll({where: {type: "pilot"}}).then((res) => {
      return res
    })

    _.each(pilots, (pilot) => {
      var pilotId = pilot.dataValues.id
      var areas = _.sample(zipCodes)
      addresses.push({
        userId: pilotId,
        zipCode: areas[0],
        lat: areas[1],
        lng: areas[2],
        address1: Faker.address.streetAddress(),
        city: Faker.address.city(),
        state: Faker.address.state(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })
    return queryInterface.bulkInsert('addresses', addresses, {})

  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('addresses', null, {})
  }
}
