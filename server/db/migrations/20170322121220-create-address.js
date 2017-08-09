'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      address1: {
        type: Sequelize.STRING,
      },
      address2: Sequelize.STRING,
      city: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      zipCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      notes: Sequelize.TEXT,
      userId: Sequelize.INTEGER,
      type: {
        type: Sequelize.STRING,
        defaultValue: 'residence',
        validate:{
          isIn: [['residence', 'commercial']]
        }
      },
      orderId: Sequelize.INTEGER,
      lat: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      lng: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('addresses')
  }
}
