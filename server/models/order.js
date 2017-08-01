'use strict'
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    pilotId: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER,
    receiptId: DataTypes.STRING,
    plan: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['basic', 'standard', 'premuim']]
      }
    },
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    timeOfDay: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    classMethods: {
      associate(models) {
        Order.belongsTo(models.user)
        Order.hasOne(models.address, {
          foreignKey: 'orderId'
        })
        Order.hasMany(models.asset, {
          foreignKey: 'assetableId',
          constraints: false,
          scope: {
            assetableType: 'order'
          }
        })
      }
    }
  })
  return Order
}
