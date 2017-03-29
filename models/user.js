'use strict'
export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    customerId: DataTypes.STRING,
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    type: DataTypes.STRING,
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
        User.hasMany(models.order, {
          foreignKey: 'userId'
        })
        User.hasMany(models.invitation, {
          foreignKey: 'userId'
        })
        User.hasOne(models.address, {
          foreignKey: 'userId'
        })
      }
    }
  })
  return User
}
