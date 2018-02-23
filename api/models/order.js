'use strict'

const { createStripeCharge } = require('../services/payments')
const uuidv4 = require('uuid/v4')

module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define('Order', {
    agentId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    uuid: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    pilotId: Sequelize.INTEGER,
    receiptId: Sequelize.STRING,
    pilotBounty: Sequelize.FLOAT,
    pilotDistance: Sequelize.FLOAT,
    reviewedBy: Sequelize.INTEGER,
    rejectedDescription: Sequelize.TEXT,
    rawUrl: Sequelize.STRING,
    pilotTransferId: Sequelize.STRING,
    pilotTransferResult: Sequelize.JSONB,
    publicAssetsWatermarked: {
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
    pilotAcceptedAt: Sequelize.DATE,
    uploadedAt: Sequelize.DATE,
    initProcessCompletedAt: Sequelize.DATE,
    reviewedAt: Sequelize.DATE,
    completedAt: Sequelize.DATE,
    rejectedAt: Sequelize.DATE,
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'recruiting',
      validate: {
        isIn: {
          args: [['recruiting', 'pending', 'filming', 'uploaded', 'initial_processing',
            'awaiting_review','final_processing', 'approved_completed', 'rejected']],
          msg: 'Order status is invalid'
        }
      }
    },
    plan: {
      type: Sequelize.STRING,
      allowNull: false
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
    case "agent": fields = [ 'status', 'rejectedAt', 'pilotId',
      'updatedAt', 'rejectedBy', 'rejectedAt', 'updatedAt' ]; break;
    case "pilot": fields = [ 'pilotId', 'reviewedAt', 'rejectedBy', 'status',
      'rejectedAt', 'updatedAt' ]; break;
    case "editor": fields = [ 'rejectedBy', 'status',
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
        assetable: 'order',
        type: 'video'
      },
      as: 'assets'
    })
    Order.hasMany(models.Asset, {
      foreignKey: 'assetableId',
      constraints: false,
      scope: {
        assetable: 'order',
        assetableName: ['video_og', 'photo']
      },
      as: 'galleryAssets'
    })
    Order.hasMany(models.Note, {
      foreignKey: 'notableId',
      constraints: false,
      scope: {
        notable: 'order'
      },
      as: 'notes'
    })
    Order.hasMany(models.Contact, {
      foreignKey: 'contactableId',
      constraints: false,
      scope: {
        contactable: 'order'
      },
      as: 'contacts'
    })
  }

  Order.beforeValidate(( order, {pln, customer} ) =>
    Object.assign(order, { uuid: uuidv4() }) )

  Order.beforeCreate( async ( order, {pln, customer} ) => {
    const stripeCharge = await createStripeCharge({ pln, customer })
    return Object.assign(order, { receiptId: stripeCharge.id })
  })

  return Order
}
