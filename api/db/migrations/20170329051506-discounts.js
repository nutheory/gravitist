'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('Discounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startsAt: {
        type: Sequelize.DATE
      },
      endsAt: {
        type: Sequelize.DATE
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      code: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      usageCount: {
        type: Sequelize.INTEGER
      },
      maxUsageCount: {
        type: Sequelize.INTEGER
      },
      amount: {
        allowNull: false,
        type: Sequelize.STRING
      },
      appliesTo: {
        values: ['standard', 'premium', 'all'],
        type: Sequelize.ENUM
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
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('Discounts')
  }
};
