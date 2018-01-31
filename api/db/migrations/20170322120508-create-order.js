'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      agentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      pilotId: Sequelize.INTEGER,
      pilotBounty: Sequelize.FLOAT,
      pilotDistance: Sequelize.FLOAT,
      videoApprovedBy: Sequelize.INTEGER,
      videoApprovedAt: Sequelize.DATE,
      uploadedAt: Sequelize.DATE,
      pilotPaymentReceiptId: Sequelize.STRING,
      editorId: Sequelize.INTEGER,
      receiptId: Sequelize.STRING,
      rawUrl: Sequelize.STRING,
      pilotAcceptedAt: Sequelize.DATE,
      editorAcceptedAt: Sequelize.DATE,
      completedAt: Sequelize.DATE,
      rejectedAt: Sequelize.DATE,
      rejectedBy: Sequelize.INTEGER,
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'recruiting',
        validate: {
          isIn: {
            args: [['recruiting', 'pending', 'filming', 'uploaded', 'processing', 'delivered', 'accepted', 'rejected']],
            msg: 'Order status is invalid'
          }
        }
      },
      plan: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['standard', 'premium']],
            msg: 'Plan is Invalid'
          }
        }
      },
      timeOfDay: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('Orders')
  }
}
