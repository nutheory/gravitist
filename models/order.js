'use strict'
export default (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    aviatorId: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER,
    receiptId: DataTypes.STRING,
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    timeOfDay: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        Order.belongsTo(models.user)
        Order.belongsToMany(models.aviator, {
          through: 'aviatorOrder',
          foriegnKey: 'orderId'
        })
        Order.hasOne(models.address, {
          foreignKey: 'orderId'
        })
        Order.hasMany(models.media, {
          foreignKey: 'orderId'
        })
      }
    }
  })
  return Order
}
