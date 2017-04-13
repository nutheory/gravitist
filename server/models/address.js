'use strict'
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('address', {
    streetOne: DataTypes.STRING,
    streetTwo: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    type: DataTypes.STRING,
    latlng: DataTypes.ARRAY(DataTypes.FLOAT)
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
