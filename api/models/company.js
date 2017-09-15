'use strict'
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('company', {
    name: DataTypes.STRING,
    display: DataTypes.BOOLEAN,
    addressId: DataTypes.INTEGER,
    logoId: DataTypes.INTEGER,
    colors: DataTypes.ARRAY(DataTypes.STRING),
    font: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        Company.hasOne(models.asset)
        Company.hasMany(models.contact, {
          foreignKey: 'contactableId',
          constraints: false,
          scope: {
            contactableType: 'company'
          }
        })
      }
    }
  })
  return Company
}
