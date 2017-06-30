'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pilotId: Sequelize.INTEGER,
      receiptId: Sequelize.STRING,
      addressId: Sequelize.INTEGER,
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending',
        validate: {
          isIn: [['pending', 'dispatching', 'processing', 'done']]
        }
      },
      plan: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['basic', 'standard', 'premuim']]
        }
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      timeOfDay: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'mid-day',
        validate: {
          isIn: [['any', 'dawn', 'mid-day', 'dusk']]
        }
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
    return queryInterface.dropTable('orders')
  }
}
