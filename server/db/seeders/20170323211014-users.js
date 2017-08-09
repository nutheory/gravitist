'use strict'

var Faker = require('faker')
var _ = require('lodash')
var bcrypt = require('bcrypt')
const typeOptions = ['agent', 'pilot', 'editor', 'admin']
const radiusOptions = [10, 20, 30, 40, 50]
const zipCodes = ["92675", "92627", "92672", "92840", "92630", "92626", "92802", "94105", "91945", "90808"]

module.exports = {
  up: async function (queryInterface, Sequelize) {

    const passwordPromise = bcrypt.hash("letmein1", 10).then((hash) => {
      return hash
    })

    const password = await Promise.resolve(passwordPromise)

    let userlist = [{
      name: "Derek Rush",
      email: "drush81@gmail.com",
      password: password,
      type: "agent",
      workRadius: _.sample(radiusOptions),
      isVerified: "true",
      bio: Faker.lorem.paragraph(),
      createdAt: new Date(),
      updatedAt: new Date()
    }]

    userlist.push({
      name: Faker.name.firstName() + " " + Faker.name.lastName(),
      email: "drush81+1@gmail.com",
      password: password,
      type: "pilot",
      isVerified: "true",
      payRate: "19.99",
      workRadius: _.sample(radiusOptions),
      bio: Faker.lorem.paragraph(),
      createdAt: new Date(),
      updatedAt: new Date()
    })

    userlist.push({
      name: Faker.name.firstName() + " " + Faker.name.lastName(),
      email: "drush81+2@gmail.com",
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
      name: Faker.name.firstName() + " " + Faker.name.lastName(),
      email: "drush81+3@gmail.com",
      password: password,
      type: "admin",
      isVerified: "true",
      workRadius: _.sample(radiusOptions),
      bio: Faker.lorem.paragraph(),
      createdAt: new Date(),
      updatedAt: new Date()
    })

    userlist.push({
      name: Faker.name.firstName() + " " + Faker.name.lastName(),
      email: "drush81+4@gmail.com",
      password: password,
      type: "admin",
      superAdmin: true,
      isVerified: "true",
      workRadius: _.sample(radiusOptions),
      bio: Faker.lorem.paragraph(),
      createdAt: new Date(),
      updatedAt: new Date()
    })

    _.times(20, () => {
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

    _.times(10, () => {
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

    return queryInterface.bulkInsert('users', userlist)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {})
  }
}
