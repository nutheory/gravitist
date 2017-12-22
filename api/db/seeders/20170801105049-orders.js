'use strict'

const { createStripeCharge } = require('../../services/payments')
const Faker = require('faker')
const _ = require('lodash')
const db = require('../../models')
const nums = [ 4, 5, 6, 7 ]
const Addresses = require('../utils/Addresses.json')
const plans = [
  { actualPrice: '19900', name: "basic" },
  { actualPrice: '19900', name: "standard" },
  { actualPrice: '19900', name: "premium" }
]
const chalk = require('chalk')
// const stati = [ 'recruiting' ]
// const stati = [ 'recruiting', 'recruiting', 'recruiting', 'recruiting',
//   'filming', 'filming', 'filming', 'delivered', 'delivered', 'accepted', 'rejected' ]

module.exports = {
  up: async function (queryInterface, Sequelize) {

    const agents = await db.User.findAll({where: {type: 'agent'}}).catch(err => { console.log(chalk.blue.bold("order1"), err); throw err })
    const pilot = await db.User.findOne({where: {email: 'drush81+pilot@gmail.com'}}).catch(err => { console.log(chalk.blue.bold("order2"), err); throw err })
    const editor = await db.User.findOne({where: {email: 'drush81+editor@gmail.com'}}).catch(err => { console.log(chalk.blue.bold("order3"), err); throw err })
    const isNew = { status: 'recruiting' }
    const isFilming = {
      status: 'filming',
      pilotId: pilot.id,
      pilotAcceptedAt: new Date()
    }
    const isDelivered = {
      status: 'delivered',
      pilotId: pilot.id,
      editorId: editor.id,
      pilotAcceptedAt: new Date(),
      editorAcceptedAt: new Date()
    }

    const statuses = [ isNew, isNew, isNew, isNew, isFilming, isFilming, isFilming, isDelivered, isDelivered ]

    let orderlist = []

    await Promise.all(agents.map( async (agent) => {
      let agentId = agent.dataValues.id
      let customer = agent.dataValues.customerId
      let num_of_orders = _.sample(nums)
      let times = [...Array(num_of_orders).keys()]
      await Promise.all(times.map( async (i) => {
        let base = {
          customer,
          agentId: agentId,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        let buildOrder = _.merge(base, _.sample(statuses))
        orderlist.push(buildOrder)
      }))
    }))

    await Promise.all(orderlist.map(async (order) => {
      let pln = _.sample(plans)
      let customerId = order.customer
      order.plan = pln.name
      // console.log(chalk.blue.bold("order"), order.customer)
      const newOrder = await db.sequelize.transaction(t => {
        return db.Order.create(order, { stripeToken: "tok_visa", transaction: t, customer: customerId, pln })
          .then(ord => {
            const address = _.merge(_.sample(Addresses), { addressableId: ord.id, addressable: 'order' })
            return db.Address.create(address, {transaction: t}).then(address => {
              const orderT = _.merge(order, { address })
              return orderT
            }).catch(err => { console.log(chalk.blue.bold("order"), err); throw err })
          }).catch(err => { console.log(chalk.blue.bold("order"), err); throw err })
        }).catch(err => { console.log(chalk.blue.bold("order"), err); throw err })
      return newOrder
    })).catch(err => { console.log(chalk.blue.bold("order"), err); throw err })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Orders', null, {})
  }
}
