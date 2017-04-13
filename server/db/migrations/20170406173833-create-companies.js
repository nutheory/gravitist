'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: Sequelize.STRING,
      display: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      accountId: Sequelize.INTEGER,
      addressId: Sequelize.INTEGER,
      phoneId: Sequelize.INTEGER,
      logoId: Sequelize.INTEGER,
      colors: Sequelize.ARRAY(Sequelize.STRING),
      font: Sequelize.STRING,
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
    return queryInterface.dropTable('companies')
  }
};
