'use strict'

var Faker = require('faker')
var _ = require('lodash')

const typeOptions = ['user', 'pilot', 'admin']
const radiusOptions = [10, 20, 30, 40, 50]

module.exports = {
  up: function (queryInterface, Sequelize) {

    let userlist = [{
      name: "Derek Rush",
      phoneNumber: "(949) 280-8977",
      email: "drush81@gmail.com",
      password: "letmein1",
      type: "super",
      bio: Faker.lorem.paragraph(),
      companyName: "NuTheory",
      workRadius: 20,
      createdAt: new Date(),
      updatedAt: new Date()
    }]

    _.times(20, () => {
      let randType = _.sample(typeOptions)
      let radius = _.sample(radiusOptions)
      userlist.push({
        name: Faker.name.firstName() + " " + Faker.name.lastName(),
        phoneNumber: Faker.phone.phoneNumber(),
        email: Faker.internet.email(),
        password: "letmein1",
        type: randType,
        bio: Faker.lorem.paragraph(),
        companyName: Faker.company.companyName(),
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
