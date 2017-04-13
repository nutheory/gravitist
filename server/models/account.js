'use strict'
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('account', {
    customerId: DataTypes.STRING,
    companyId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate(models) {
        Account.hasMany(models.user)
        Account.hasOne(models.company)
      }
    }
  })
  return Account
}
