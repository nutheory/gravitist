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
      editorId: Sequelize.INTEGER,
      receiptId: Sequelize.STRING,
      acceptedAt: Sequelize.DATE,
      rejectedAt: Sequelize.DATE,
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending',
        validate: {
          isIn: {
            args: [['pending', 'filming', 'processing', 'delivered', 'accepted', 'rejected']],
            msg: 'Order status is invalid'
          }
        }
      },
      plan: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['basic', 'standard', 'premium']],
            msg: 'Plan is Invalid'
          }
        }
      },
      agentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      timeOfDay: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'mid-day',
        validate: {
          isIn: {
            args: [['any', 'dawn', 'mid-day', 'dusk']],
            msg: 'Time of day is invalid'
          }
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
