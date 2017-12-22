'use strict'

const Faker = require('faker')
const _ = require('lodash')
const db = require('../../models')

module.exports = {
  up: async function (queryInterface, Sequelize) {
    // const agents = db.User.find
    // const companies = await db.Company.create({
    //
    // })
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
