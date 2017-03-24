'use strict'
export default (sequelize, DataTypes) => {
  const Media = sequelize.define('Media', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    type: DataTypes.STRING,
    license: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        Media.belongsTo(models.Order, {
          foreignKey: 'orderId'
        })
      }
    }
  })
  return Media
}
