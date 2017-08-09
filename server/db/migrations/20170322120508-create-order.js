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
          isIn: [['pending', 'filming', 'processing', 'delivered', 'accepted', 'rejected']]
        }
      },
      plan: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['basic', 'standard', 'premium']]
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
