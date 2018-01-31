'use strict'
module.exports = (sequelize, Sequelize) => {
  const Note = sequelize.define('Note', {
    notableId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    notable: {
      allowNull: false,
      type: Sequelize.STRING
    },
    authorId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    body: {
      allowNull: false,
      type: Sequelize.TEXT
    },
    visibility: Sequelize.JSONB,
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  })

  Note.associate = function (models) {
    Note.belongsTo(models.Order, {
      foreignKey: 'notableId',
      constraints: false,
      as: 'order'
    })
    Note.belongsTo(models.User, {
      constraints: false,
      as: 'author'
    })
    Note.belongsTo(models.Asset, {
      foreignKey: 'notableId',
      constraints: false,
      as: 'asset'
    })
  }

  return Note
}
