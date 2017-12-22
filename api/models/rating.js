'use strict'
module.exports = (sequelize, Sequelize) => {
  const Rating = sequelize.define('Rating', {
    ratableId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    ratable: {
      allowNull: false,
      type: Sequelize.STRING
    },
    rating: {
      allowNull: false,
      type: Sequelize.INTEGER
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
  Rating.associate = function (models) {
    Rating.belongsTo(models.Order, {
      foreignKey: 'ratableId',
      constraints: false,
      as: 'order'
    })
    Rating.belongsTo(models.User, {
      foreignKey: 'ratableId',
      constraints: false,
      as: 'user'
    })
    Rating.belongsTo(models.Asset, {
      foreignKey: 'ratableId',
      constraints: false,
      as: 'asset'
    })
  }

  return Rating
}
