'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Listings', {
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
      mlsNumber: Sequelize.STRING,
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
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Listings')
  }
};
