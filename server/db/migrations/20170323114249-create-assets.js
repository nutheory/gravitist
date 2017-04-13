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
      filename: {
        type: Sequelize.STRING,
        allowNull: false
      },
      filesize: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
        validate: {
          isIn: [[]]
        }
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
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
