'use strict'
module.exports = (sequelize, DataTypes) => {
  const PilotOrder = sequelize.define('pilotOrder', {

  }, {
    classMethods: {
      associate(models) {

      }
    }
  })
  return PilotOrder
}
