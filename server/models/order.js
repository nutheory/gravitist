'use strict'
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    agentId: DataTypes.INTEGER,
    pilotId: DataTypes.INTEGER,
    editorId: DataTypes.INTEGER,
    receiptId: DataTypes.STRING,
    acceptedAt: DataTypes.DATE,
    rejectedAt: DataTypes.DATE,
    receiptId: DataTypes.STRING,
    plan: {
      type: DataTypes.STRING,
      // validate: {
      //   isIn: [['basic', 'standard', 'premuim']]
      // }
    },
    status: DataTypes.STRING,
    timeOfDay: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    classMethods: {
      associate(models) {
        Order.belongsTo(models.user, {as: 'agent'})
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
