'use strict'

const bcrypt = require('bcrypt')

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
    bio: DataTypes.TEXT,
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    workRadius: DataTypes.INTEGER,
    payRate: DataTypes.DECIMAL,
    superAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
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
          foreignKey: 'userId',
          onDelete: 'cascade',
          hooks: true
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
        return bcrypt.hash(user.password, 10).then(hash => {
          user.password = hash
        })
      },
      beforeUpdate: (user, options) => {
        console.log("USER MOD EX", user.password)
        console.log("USER MOD PASS", user.changed('password'))

        if(user.changed('password')) {
          console.log("CHANGED PASSWORD", user.password)
          return bcrypt.hash(user.password, 10).then(hash => {
            user.password = hash
          })
        } else {
          console.log("NOT CHANGED PASSWORD", user.password)
        }
      }
    }
  })
  return User
}
