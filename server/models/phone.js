'use strict'
module.exports = (sequelize, DataTypes) => {
  const Phone = sequelize.define('phone', {
    type: DataTypes.STRING,
    number: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    companyId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate(models) {
        Phone.belongsTo(models.user)
        Phone.belongsTo(models.company)
      }
    }
  })
  return Phone
}
