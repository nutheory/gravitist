'use strict'

const { createStripeCharge } = require('../services/payments')

module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define('Order', {
    agentId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    pilotId: Sequelize.INTEGER,
    editorId: Sequelize.INTEGER,
    receiptId: Sequelize.STRING,
    pilotBounty: Sequelize.FLOAT,
    pilotDistance: Sequelize.FLOAT,
    videoApprovedBy: Sequelize.INTEGER,
    videoApprovedAt: Sequelize.DATE,
    uploadedAt: Sequelize.DATE,
    rawUrl: Sequelize.STRING,
    pilotPaymentReceiptId: Sequelize.STRING,
    pilotAcceptedAt: Sequelize.DATE,
    editorAcceptedAt: Sequelize.DATE,
    completedAt: Sequelize.DATE,
    rejectedAt: Sequelize.DATE,
    rejectedBy: Sequelize.DATE,
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

  Order.updateFields = (type) => {
    let fields
    switch(type) {
    case "agent": fields = [ 'status', 'agentAcceptedAt', 'rejectedAt', 'pilotId',
      'editorId', 'updatedAt', 'rejectedBy', 'rejectedAt', 'updatedAt' ]; break;
    case "pilot": fields = [ 'pilotId', 'pilotAcceptedAt', 'rejectedBy', 'status',
      'rejectedAt', 'updatedAt' ]; break;
    case "editor": fields = [ 'editorId', 'editorAcceptedAt', 'rejectedBy', 'status',
      'rejectedAt', 'updatedAt' ]; break;
    // case "admin": fields = [ 'password', 'bio', 'avatarId', 'name', 'payrate',
    //   'workRadius', 'licenseId', 'insuranceId' ]; break;
    }
    return fields
  }

  Order.associate = function (models) {
    Order.belongsTo(models.User, {
      foreignKey: 'agentId',
      as: 'agent'
    })
    Order.belongsTo(models.User, {
      foreignKey: 'pilotId',
      as: 'pilot'
    })
    Order.belongsTo(models.User, {
      foreignKey: 'editorId',
      as: 'editor'
    })
    Order.hasOne(models.Address, {
      foreignKey: 'addressableId',
      onDelete: 'CASCADE',
      scope: {
        addressable: 'order'
      },
      as: 'address',
      hooks: true
    })
    Order.hasOne(models.Listing, {
      foreignKey: 'orderId',
      onDelete: 'CASCADE',
      as: 'listing'
    })
    Order.hasMany(models.Asset, {
      foreignKey: 'assetableId',
      constraints: false,
      scope: {
        assetable: 'order'
      },
      as: 'assets'
    })
    Order.hasMany(models.Note, {
      foreignKey: 'notableId',
      constraints: false,
      scope: {
        notable: 'order'
      },
      as: 'notes'
    })
    Order.hasMany(models.Rating, {
      foreignKey: 'ratableId',
      constraints: false,
      scope: {
        ratable: 'order'
      },
      as: 'rating'
    })
  }

  Order.beforeCreate( async ( order, {pln, customer} ) => {
    const stripeCharge = await createStripeCharge({ pln, customer })
    return Object.assign(order, { receiptId: stripeCharge.id })
  })

  return Order
}
