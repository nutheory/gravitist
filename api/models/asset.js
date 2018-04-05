'use strict'
module.exports = (sequelize, Sequelize) => {
  const Asset = sequelize.define('Asset', {
    assetableId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    assetable: {
      type: Sequelize.STRING,
      allowNull: false
    },
    assetableName: Sequelize.STRING,
    uploaderId: Sequelize.INTEGER,
    awsId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false
    },
    verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    rejectedAt: {
      type: Sequelize.DATE,
    },
    default: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    watermarked: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    thumbnail: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    name: Sequelize.STRING,
    ext: Sequelize.STRING,
    mime: Sequelize.STRING,
    type: Sequelize.STRING,
    size: Sequelize.STRING,
    meta: Sequelize.JSONB
  })

  Asset.updateFields = () => {
    return [ 'awsId', 'url', 'verified', 'active', 'name', 'ext', 'mime', 'type', 'size', 'meta' ]
  }

  Asset.associate = function (models) {
    Asset.belongsTo(models.Company, {
      foreignKey: 'assetableId',
      constraints: false,
      as: 'logo'
    })
    Asset.belongsTo(models.User, {
      foreignKey: 'assetableId',
      constraints: false,
      as: 'avatar'
    })
    Asset.belongsTo(models.User, {
      foreignKey: 'assetableId',
      constraints: false,
      as: 'license'
    })
    Asset.belongsTo(models.User, {
      foreignKey: 'assetableId',
      constraints: false,
      as: 'insurance'
    })
    Asset.belongsTo(models.Order, {
      foreignKey: 'assetableId',
      constraints: false,
      as: 'order'
    })
    Asset.hasMany(models.Rating, {
      foreignKey: 'ratableId',
      onDelete: 'CASCADE',
      scope: {
        ratable: 'asset'
      }
    })
    Asset.hasMany(models.Note, {
      foreignKey: 'notableId',
      onDelete: 'CASCADE',
      scope: {
        notable: 'asset'
      }
    })
  }

  return Asset
}
