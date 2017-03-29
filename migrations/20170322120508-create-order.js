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
      aviatorId: Sequelize.INTEGER,
      receiptId: Sequelize.STRING,
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending',
        validate: {
          isIn: [['pending', 'dispatching', 'processing', 'done']]
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
