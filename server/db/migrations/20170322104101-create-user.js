'use strict'

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.STRING
      },
      avatarId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
        }
      },
      bio: Sequelize.TEXT,
      companyId: Sequelize.INTEGER,
      profileId: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
      profileType: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['agent', 'pilot', 'editor', 'admin']]
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('users')
  }
}
