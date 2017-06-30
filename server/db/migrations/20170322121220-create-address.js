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
        allowNull: false,
        unique: false,
      },
      address2: Sequelize.STRING,
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apt: Sequelize.STRING,
      zip: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      notes: Sequelize.TEXT,
      userId: Sequelize.INTEGER,
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'residence',
        validate:{
          isIn: [['residence', 'commercial']]
        }
      },
      orderId: Sequelize.INTEGER,
      lat: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lng: {
        type: Sequelize.STRING,
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
