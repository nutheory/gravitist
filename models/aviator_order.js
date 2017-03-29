'use strict'
export default (sequelize, DataTypes) => {
  const AviatorOrder = sequelize.define('aviatorOrder', {

  }, {
    classMethods: {
      associate(models) {

      }
    }
  })
  return AviatorOrder
}
