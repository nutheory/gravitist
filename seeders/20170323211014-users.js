'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('User', [{
      name: 'John Doe',
      isBetaMember: false
    }, {

    }], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Person', null, {})
  }
};
