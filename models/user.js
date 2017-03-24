'use strict'
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    externalId: DataTypes.STRING,
    addressId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userType: DataTypes.STRING,
    avatar: DataTypes.STRING,
    bio: DataTypes.TEXT,
    company: DataTypes.STRING,
    workRadius: DataTypes.INTEGER,
    ratingCount: DataTypes.INTEGER,
    rating: DataTypes.DECIMAL,
    payRate: DataTypes.DECIMAL,
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Order, {
          foreignKey: 'userId'
        })
        User.hasMany(models.Invitation, {
          foreignKey: 'userId'
        })
        User.hasOne(models.Address, {
          foreignKey: 'addressId'
        })
      }
    }
  })
  return User
}
