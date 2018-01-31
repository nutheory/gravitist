'use strict'
module.exports = function(sequelize, Sequelize) {
  const Listing = sequelize.define('Listing', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    orderId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    beds: Sequelize.STRING,
    baths: Sequelize.STRING,
    price: Sequelize.STRING,
    sqft: Sequelize.STRING,
    type: Sequelize.STRING,
    mlsStatus: Sequelize.STRING,
    description: Sequelize.TEXT,
    features: Sequelize.JSONB,
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  })

  Listing.associate = function (models) {
    Listing.belongsTo(models.Order, {
      foreignKey: 'orderId',
      constraints: false,
      as: 'order'
    })
  }

  return Listing
}
