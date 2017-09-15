'use strict'
const { createStripeCustomer } = require('../../services/users')
const Faker = require('faker')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const typeOptions = ['agent', 'pilot', 'editor', 'admin']
const radiusOptions = [10, 20, 30, 40, 50]

module.exports = {
  up: async function (queryInterface, Sequelize) {

    let customer
    const passwordPromise = bcrypt.hash("Letmein@1", 10).then((hash) => { return hash })
    const password = await Promise.resolve(passwordPromise)

    let userlist = [{
      name: "Derek Rush",
      email: "drush81+agent@gmail.com",
      password: password,
      type: "agent",
      workRadius: _.sample(radiusOptions),
      isVerified: "true",
      bio: Faker.lorem.paragraph(),
      createdAt: new Date(),
      updatedAt: new Date()
    }]

    userlist.push({
      name: "Jim Jeffries",
      email: "drush81+pilot@gmail.com",
      password: password,
      type: "pilot",
      isVerified: "true",
      payRate: "19.99",
      workRadius: 40,
      bio: Faker.lorem.paragraph(),
      createdAt: new Date(),
      updatedAt: new Date()
    })

    userlist.push({
      name: "Jon Schnitzer",
      email: "drush81+editor@gmail.com",
      password: password,
      type: "editor",
      isVerified: "true",
      payRate: "19.99",
      workRadius: _.sample(radiusOptions),
      bio: Faker.lorem.paragraph(),
      createdAt: new Date(),
      updatedAt: new Date()
    })

    userlist.push({
      name: "Bernie Sanders",
      email: "drush81+admin@gmail.com",
      password: password,
      type: "admin",
      isVerified: "true",
      workRadius: _.sample(radiusOptions),
      bio: Faker.lorem.paragraph(),
      createdAt: new Date(),
      updatedAt: new Date()
    })

    userlist.push({
      name: "Mark Cuban",
      email: "drush81+super@gmail.com",
      password: password,
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
        password: password,
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
        password: password,
        type: "pilot",
        isVerified: "true",
        payRate: "19.99",
        workRadius: _.sample(radiusOptions),
        bio: Faker.lorem.paragraph(),
        workRadius: radius,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    })

    await Promise.all(userlist.map(async (user) => {
      let customer = await createStripeCustomer({ email: user.email, stripeInfo: "tok_visa" })
      console.log("CUS", customer)
      user.customerId = customer.id
    }))

    return queryInterface.bulkInsert('users', userlist)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {})
  }
}
