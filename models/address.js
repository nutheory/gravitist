'use strict'
export default (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
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
        Address.belongsTo(models.Order, {foreignKey: 'addressId'})
        Address.belongsTo(models.User, {foreignKey: 'addressId'})
      }
    }
  })
  return Address
}
