'use strict'
module.exports = (sequelize, DataTypes) => {
  const Pilot = sequelize.define('pilot', {
    orderId: DataTypes.INTEGER,
    acceptedAt: DataTypes.DATE,
    assigned: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate(models) {
        Pilot.belongsToMany(models.order, {
          through: 'pilotOrder',
          foriegnKey: 'pilotId'
        })
      }
    }
  })
  return Pilot
}
