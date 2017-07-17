'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('pilots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      licenseId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      insuranceId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      bankAccount: {
        type: Sequelize.STRING
      },
      bankRouting: {
        type: Sequelize.STRING
      },
      zipcode: {
        allowNull: false,
        type: Sequelize.STRING
      },
      workRadius: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      payRate: Sequelize.DECIMAL,
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('pilots')
  }
}
