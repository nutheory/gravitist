'use strict'
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('address', {
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    type: DataTypes.STRING,
    lat:  DataTypes.DOUBLE,
    lng:  DataTypes.DOUBLE
  }, {
    classMethods: {
      associate(models) {
        Address.belongsTo(models.order)
        Address.belongsTo(models.user)
      }
    }
  })
  return Address
}
