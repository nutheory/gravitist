'use strict'
export default (sequelize, DataTypes) => {
  const AviatorOrder = sequelize.define('AviatorOrder', {

  }, {
    classMethods: {
      associate(models) {

      }
    }
  })
  return AviatorOrder
}
