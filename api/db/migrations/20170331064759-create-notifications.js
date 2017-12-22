'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        validate: {
          isIn: [['status_update', 'rejected', 'accepted']]
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Notifications')
  }
};
