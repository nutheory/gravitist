'use strict'

const Faker = require('faker')
const _ = require('lodash')
const Db = require('../../models')
const User = Db.sequelize.models.user
const Addresses = require('../utils/Addresses.json')

module.exports = {

  up: async function(queryInterface, Sequelize) {

    let addresses = []
    let address, pilotId, imported

    let pilots = await User.findAll({ where: { type: 'pilot' } })
      .then(res => {
        return res
      })
      .catch(err => {
        console.log('ERR', err)
      })

    _.each(pilots, pilot => {
      pilotId = pilot.dataValues.id
      imported = _.sample( Addresses )
      address = _.merge(imported, {
        userId: pilotId,
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

}
