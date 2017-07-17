'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('editors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bankAccount: {
        type: Sequelize.STRING
      },
      bankRouting: {
        type: Sequelize.STRING
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('editors')
  }
};
