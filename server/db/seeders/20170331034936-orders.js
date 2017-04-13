'use strict'

var Faker = require('faker')
var _ = require('lodash')
var Db = require('../models')

module.exports = {
  up: function (queryInterface, Sequelize) {
    let list = []
    let users = Db.sequelize.models.user.findAll().then(function(userlist){
      _.each(userlist, function(user){
        list.push(user.name)
      })
    })
    console.log("list", list)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('orders', null, {})
  }
};
