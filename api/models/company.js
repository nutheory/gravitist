'use strict'
module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define('Company', {
    ownerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    key: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    subtitle: Sequelize.STRING,
    styles: Sequelize.JSONB,
    visible: {
      type: Sequelize.BOOLEAN,
      default: false
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

  Company.updateFields = () => {
    return [ 'name', 'subtitle', 'styles', 'visible', 'logo' ]
  }

  Company.associate = function (models) {
    Company.hasOne(models.Asset, {
      foreignKey: 'assetableId',
      constraints: false,
      scope: {
        assetable: 'logo'
      },
      onDelete: 'CASCADE',
      hooks: true,
      as: 'logo'
    })
    Company.hasMany(models.Contact, {
      foreignKey: 'contactableId',
      constraints: false,
      scope: {
        contactable: 'company'
      }
    })
    Company.hasMany(models.User, {
      foreignKey: 'companyId',
      as: 'company'
    })
  }

  return Company
}
