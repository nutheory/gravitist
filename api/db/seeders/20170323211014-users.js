'use strict'
require('dotenv').config()
const { createStripeCustomer } = require('../../services/payments')
const db = require('../../models')
const Faker = require('faker')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const Addresses = require('../utils/Addresses.json')
const typeOptions = ['agent', 'pilot', 'editor', 'admin']
const radiusOptions = [10, 20, 30, 40, 50]
const password = "Letmein@1"
const chalk = require('chalk')

module.exports = {
  up: async function (queryInterface, Sequelize) {

    let userlist = [{
      name: "Derek Rush",
      email: "drush81+agent@gmail.com",
      password,
      type: "agent",
      isVerified: "true",
      bio: Faker.lorem.paragraph(),
      createdAt: new Date(),
      updatedAt: new Date()
    }]

    userlist.push({
      name: "Jim Jeffries",
      email: "drush81+pilot@gmail.com",
      password,
      type: "pilot",
      isVerified: "true",
      insuranceId: 1,
      licenseId: 1,
      workRadius: 40,
      bio: Faker.lorem.paragraph(),
      createdAt: new Date(),
      updatedAt: new Date()
    })

    userlist.push({
      name: "Bernie Sanders",
      email: "drush81+admin@gmail.com",
      password,
      type: "unapproved_admin",
      isVerified: "true",
      workRadius: _.sample(radiusOptions),
      bio: Faker.lorem.paragraph(),
      createdAt: new Date(),
      updatedAt: new Date()
    })

    userlist.push({
      name: "Mark Cuban",
      email: "drush81+super@gmail.com",
      password,
      type: "admin",
      superAdmin: true,
      isVerified: "true",
      workRadius: _.sample(radiusOptions),
      bio: Faker.lorem.paragraph(),
      createdAt: new Date(),
      updatedAt: new Date()
    })

    _.times(50, () => {
      userlist.push({
        name: Faker.name.firstName() + " " + Faker.name.lastName(),
        email: Faker.internet.email(),
        password,
        type: "agent",
        bio: Faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })

    _.times(20, () => {
      let radius = _.sample(radiusOptions)
      userlist.push({
        name: Faker.name.firstName() + " " + Faker.name.lastName(),
        email: Faker.internet.email(),
        password,
        type: "pilot",
        isVerified: "true",
        insuranceId: 1,
        licenseId: 1,
        workRadius: _.sample(radiusOptions),
        bio: Faker.lorem.paragraph(),
        workRadius: radius,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })

    await Promise.all(userlist.map(async (user) => {
      const newUser = await db.sequelize.transaction(t => {
        return db.User.create(user, { stripeToken: "tok_visa", transaction: t })
          .then(u => {
            const address = _.merge(_.sample(Addresses), { addressableId: u.id, addressable: 'user', addressableName: u.type })
            return db.Address.create(address, {transaction: t}).then(address => {
              return _.merge(user, { address })
            }).catch(err => { console.log(chalk.blue.bold("user"), err); throw err })
          }).catch(err => { console.log(chalk.blue.bold("user"), err); throw err })
      }).catch(err => { console.log(chalk.blue.bold("user"), err); throw err })
      return newUser
    }))

    // return queryInterface.bulkInsert('Users', userlist)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
