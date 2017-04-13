'use strict'
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('rating', {
    ratableId: DataTypes.INTEGER,
    ratableType: DataTypes.STRING,
    filename: DataTypes.STRING,
    url: DataTypes.STRING,
    filesize: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        Rating.belongsTo(models.order)
        Rating.belongsTo(models.account)
        Rating.belongsTo(models.user)
      }
    }
  })
  return Rating
}
