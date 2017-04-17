'use strict'

var bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: DataTypes.STRING,
    accountId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.STRING,
    avatarId: DataTypes.INTEGER,
    bio: DataTypes.TEXT,
    workRadius: DataTypes.INTEGER,
    ratingCount: DataTypes.INTEGER,
    rating: DataTypes.DECIMAL,
    payRate: DataTypes.DECIMAL,
  }, {
    classMethods: {

      associate(models) {
        User.hasMany(models.order, {
          foreignKey: 'userId'
        })
        User.hasMany(models.phone, {
          foreignKey: 'phonableId',
          constraints: false,
          phonableType: 'user'
        })
        User.hasMany(models.invitation, {
          foreignKey: 'userId'
        })
        User.hasMany(models.notification, {
          foreignKey: 'userId'
        })
        User.hasOne(models.address, {
          foreignKey: 'userId'
        })
        User.hasOne(models.asset, {
          foreignKey: 'avatarId'
        })
        User.belongsTo(models.account)
      },

      findByToken(token, cb) {
        process.nextTick(() => {
          this.findOne({ where: { token } }).then((user) => {
            if (user){
              return cb(null, user)
            }
          })
          return cb(null, null)
        })
      }
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
