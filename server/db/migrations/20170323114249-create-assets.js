'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('assets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      assetableId: {
        type: Sequelize.INTEGER,
      },
      assetableType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      publicId: {
        type: Sequelize.STRING,
        allowNull: false
      }
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      size: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false
      },
      meta: {
        type: Sequelize.STRING,
        allowNull: false
      }
      notes: Sequelize.TEXT,
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
    return queryInterface.dropTable('assets')
  }
}
