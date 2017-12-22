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
    name: Sequelize.STRING,
    content: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      validate:{
        isIn: {
          args: [['phone', 'skype', 'slack', 'email', 'url']],
          msg: 'Contact type is invalid'
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
  }

  return Contact
}
