'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contactableId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      contactable: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: Sequelize.STRING,
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        validate:{
          isIn: {
            args: [['phone', 'skype', 'slack', 'email', 'url']],
            msg: 'Contact type is invalid'
          }
        }
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
    return queryInterface.dropTable('Contacts')
  }
};
