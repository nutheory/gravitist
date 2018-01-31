'use strict'

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.STRING
      },
      accountId: Sequelize.STRING,
      companyId: Sequelize.INTEGER,
      companyOwner: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Email is invalid'
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: {
            args: ["^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$"],
            msg: 'Password is invalid'
          }
        }
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      verifiedBy: Sequelize.INTEGER,
      workRadius: Sequelize.INTEGER,
      payRate: Sequelize.DECIMAL,
      bio: Sequelize.TEXT,
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['agent', 'pilot', 'unaprroved_editor', 'unapproved_admin', 'editor', 'admin' ]],
            msg: 'Type is invalid'
          }
        }
      },
      refreshToken: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      termsAccepted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      superAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    return queryInterface.dropTable('Users')
  }
}
