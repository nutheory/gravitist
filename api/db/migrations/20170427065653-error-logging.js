'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('ErrorLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      errorableId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      errorable: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      name: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING
      },
      reason: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      jsonResponse: {
        type: Sequelize.JSONB
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('ErrorLogs')
  }
};
