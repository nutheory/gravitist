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
      uuid: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      agentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      receiptId: Sequelize.STRING,
      pilotId: Sequelize.INTEGER,
      pilotBounty: Sequelize.FLOAT,
      pilotDistance: Sequelize.FLOAT,
      amountPaid: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pilotTransferId: Sequelize.STRING,
      pilotTransferResult: Sequelize.JSONB,
      pilotAcceptedAt: Sequelize.DATE,
      reviewedBy: Sequelize.INTEGER,
      rejected: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      rawUrl: Sequelize.STRING,
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'recruiting'
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
      publicAssetsWatermarked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      needsAttention: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      galleryUrl: Sequelize.STRING,
      history: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {}
      },
      discountId: Sequelize.INTEGER,
      pilotAcceptedAt: Sequelize.DATE,
      uploadedAt: Sequelize.DATE,
      initProcessCompletedAt: Sequelize.DATE,
      reviewedAt: Sequelize.DATE,
      completedAt: Sequelize.DATE,
      rejectedAt: Sequelize.DATE,
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
