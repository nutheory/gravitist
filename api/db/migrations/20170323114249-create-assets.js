'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Assets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      assetableId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      assetable: {
        type: Sequelize.STRING,
        allowNull: false
      },
      assetableName: Sequelize.STRING,
      awsId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      uploaderId: Sequelize.INTEGER,
      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      watermarked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      thumbnail: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      rejectedAt: {
        type: Sequelize.DATE
      },
      galleryVisible: Sequelize.BOOLEAN,
      default: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      name: Sequelize.STRING,
      mime: Sequelize.STRING,
      ext: Sequelize.STRING,
      size: Sequelize.STRING,
      type: Sequelize.STRING,
      meta: Sequelize.JSONB
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Assets')
  }
}
