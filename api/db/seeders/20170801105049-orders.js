'use strict'

const Faker = require('faker')
const _ = require('lodash')
const Db = require('../../models')
const nums = [ 4, 5, 6, 7 ]
const plans = ["basic", "standard", "premium"]
const stati = ['pending', 'filming', 'processing', 'delivered', 'accepted', 'rejected']
const User = Db.sequelize.models.user
const Address = Db.sequelize.models.address
const Order = Db.sequelize.models.order

module.exports = {
  up: async function (queryInterface, Sequelize) {

    const agents = await User.findAll({where: {type: 'agent'}}).then(res => {
      return res
    })

    let orders = []

    _.each(agents, (agent) => {
      let agentId = agent.dataValues.id
      let num_of_orders = _.sample(nums)
      _.times(num_of_orders,() => {
        orders.push({
          plan: _.sample(plans),
          status: _.sample(stati),
          receiptId: "fakey",
          agentId: agentId,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      })
    })

    return queryInterface.bulkInsert('orders', orders)

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('orders', null, {})
  }
}
