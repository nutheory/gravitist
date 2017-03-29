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
      customerId: Sequelize.STRING,
      addressId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phoneNumber: {
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
      notes: Sequelize.TEXT,
      company: Sequelize.STRING,
      workRadius: Sequelize.INTEGER,
      rating: Sequelize.DECIMAL,
      ratingCount: Sequelize.INTEGER,
      payRate: Sequelize.DECIMAL,
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['user', 'aviator', 'admin', 'super']]
        }
      },
      avatar: Sequelize.STRING,
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
