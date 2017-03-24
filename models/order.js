'use strict'
export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    aviatorId: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER,
    receiptId: DataTypes.STRING,
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    timeOfDay: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        Order.belongsTo(models.User, {
          foreignKey: 'userId',
          allowNull: false
        })
        Order.belongsToMany(models.Aviator, {
          through: 'AviatorOrder',
          foriegnKey: 'orderId'
        })
        Order.hasOne(models.Address, {
          foreignKey: 'addressId'
        })
        Order.hasMany(models.Media, {
          foreignKey: 'orderId'
        })
      }
    }
  })
  return Order
}
