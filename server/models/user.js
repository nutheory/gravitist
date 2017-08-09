'use strict'

var bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: DataTypes.STRING,
    customerId: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    type: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['agent', 'pilot', 'editor', 'admin']]
      }
    },
    avatarId: DataTypes.INTEGER,
    bio: DataTypes.TEXT,
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    licenseId: DataTypes.INTEGER,
    insuranceId: DataTypes.INTEGER,
    bankAccount: DataTypes.STRING,
    bankRouting: DataTypes.STRING,
    workRadius: DataTypes.INTEGER,
    payRate: DataTypes.DECIMAL,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.order, {
          foreignKey: 'agentId'
        })
        User.hasMany(models.contact, {
          foreignKey: 'contactableId',
          constraints: false,
          phonableType: 'user'
        })
        User.hasMany(models.invitation, {
          foreignKey: 'userId'
        })
        User.hasMany(models.notification, {
          foreignKey: 'authorId'
        })
        User.hasOne(models.address, {
          foreignKey: 'userId'
        })
        User.hasMany(models.asset, {
          foreignKey: 'assetableId',
          constraints: false,
          scope: {
            assetable: 'user'
          }
        })
      },
    },

    instanceMethods: {
      comparePassword(pw, cb) {
        bcrypt.compare(pw, this.password, (err, isMatch) => {
          if(err){
            return cb(err)
          }
          return cb(null, isMatch)
        })
      }
    },

    hooks: {
      beforeCreate: (user) => {
        return bcrypt.hash(user.password, 10).then((hash) => {
          user.password = hash
        })
      },
      beforeUpdate: (user) => {
        if (user.password) {
          return bcrypt.hash(user.password, 10).then((hash) => {
            user.password = hash
          })
        }
      }
    }
  })
  return User
}
