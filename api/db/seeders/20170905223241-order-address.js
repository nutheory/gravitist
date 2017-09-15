'use strict'

const Faker = require('faker')
const _ = require('lodash')
const Db = require('../../models')
const Order = Db.sequelize.models.order
const Addresses = require('../utils/Addresses.json')

module.exports = {
  up: async function (queryInterface, Sequelize) {

    const addresses = []
    let address, orderId, imported

    const orders = await Order.all().then(res => { return res })

    _.each(orders, (order) => {
      orderId = order.dataValues.id
      imported = _.sample(Addresses)
      address = _.merge(imported, {
        orderId: orderId,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      addresses.push(address)
    })

    return queryInterface.bulkInsert('addresses', addresses)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('addresses', null, {})
  }
};
