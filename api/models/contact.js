'use strict'
module.exports = (sequelize, Sequelize) => {
  const Contact = sequelize.define('Contact', {
    contactableId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    contactable: {
      type: Sequelize.STRING,
      allowNull: false
    },
    default: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    name: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
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

  Contact.associate = function (models) {
    Contact.belongsTo(models.User, {
      foreignKey: 'contactableId',
      constraints: false,
      as: 'user'
    })
    Contact.belongsTo(models.Company, {
      foreignKey: 'contactableId',
      constraints: false,
      as: 'company'
    })
    Contact.belongsTo(models.Order, {
      foreignKey: 'contactableId',
      constraints: false,
      as: 'order'
    })
  }

  return Contact
}
