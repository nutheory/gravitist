'use strict'
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('company', {
    name: DataTypes.STRING,
    display: DataTypes.BOOLEAN,
    addressId: DataTypes.INTEGER,
    phoneId: DataTypes.INTEGER,
    logoId: DataTypes.INTEGER,
    colors: DataTypes.ARRAY(DataTypes.STRING),
    font: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        Company.hasOne(models.address)
        Company.hasOne(models.asset)
        Company.hasMany(models.phone, {
          foreignKey: 'phonableId',
          constraints: false,
          scope: {
            phonableType: 'company'
          }
        })
      }
    }
  })
  return Company
}
