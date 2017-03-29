'use strict'
export default (sequelize, DataTypes) => {
  const Aviator = sequelize.define('aviator', {
    orderId: DataTypes.INTEGER,
    acceptedAt: DataTypes.DATE,
    assigned: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate(models) {
        Aviator.belongsToMany(models.order, {
          through: 'aviatorOrder',
          foriegnKey: 'aviatorId'
        })
      }
    }
  })
  return Aviator
}
