'use strict'
export default (sequelize, DataTypes) => {
  const Aviator = sequelize.define('Aviator', {
    orderId: DataTypes.INTEGER,
    acceptedAt: DataTypes.DATE,
    assigned: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate(models) {
        Aviator.belongsToMany(models.Order, {
          through: 'AviatorOrder',
          foriegnKey: 'aviatorId'
        })
      }
    }
  })
  return Aviator
}
