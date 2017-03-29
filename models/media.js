'use strict'
export default (sequelize, DataTypes) => {
  const Media = sequelize.define('media', {
    filename: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        Media.belongsTo(models.order)
      }
    }
  })
  return Media
}
