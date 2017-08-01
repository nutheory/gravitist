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
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      licenseId: {
        type: Sequelize.INTEGER
      },
      insuranceId: {
        type: Sequelize.INTEGER
      },
      bankAccount: {
        type: Sequelize.STRING
      },
      bankRouting: {
        type: Sequelize.STRING
      },
      zipcode: {
        type: Sequelize.STRING
      },
      workRadius: {
        type: Sequelize.INTEGER
      },
      payRate: Sequelize.DECIMAL,
      bio: Sequelize.TEXT,
      companyId: Sequelize.INTEGER,
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['agent', 'pilot', 'editor', 'admin']]
        }
      },
      superAdmin: {
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
      }
    })
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('users')
  }
}
