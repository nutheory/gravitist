'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('SocialApis', {
      orderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      message: {
        type: Sequelize.STRING
      },
      postedTo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      assetId: {
        type: Sequelize.INTEGER,
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('SocialApis')
  }
};
