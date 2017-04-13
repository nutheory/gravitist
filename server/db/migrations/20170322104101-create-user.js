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
      accountId: {
        //allowNull: false,
        type: Sequelize.INTEGER
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
      companyName: Sequelize.STRING,
      workRadius: Sequelize.INTEGER,
      rating: Sequelize.DECIMAL,
      ratingCount: Sequelize.INTEGER,
      payRate: Sequelize.DECIMAL,
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['user', 'pilot', 'admin', 'super']]
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
