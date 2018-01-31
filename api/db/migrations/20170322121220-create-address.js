'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      addressableId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      addressable: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      addressableName: Sequelize.STRING,
      name: Sequelize.STRING,
      address1: Sequelize.STRING,
      address2: Sequelize.STRING,
      city: Sequelize.STRING,
      state: Sequelize.STRING,
      zipCode: Sequelize.STRING,
      type: {
        type: Sequelize.STRING,
        defaultValue: 'residence',
        validate:{
          isIn: {
            args: [['residence', 'commercial']],
            msg: 'Address type is invalid'
          }
        }
      },
      lat: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      lng: {
        type: Sequelize.FLOAT,
        allowNull: false,
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
    return queryInterface.dropTable('Addresses')
  }
}
