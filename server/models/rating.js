'use strict'
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('rating', {
    // ratableId: DataTypes.INTEGER,
    // ratableType: DataTypes.STRING,
    // rating:
  }, {
    classMethods: {
      // associate(models) {
      //   Rating.belongsTo(models.order)
      //   Rating.belongsTo(models.user)
      // }
    }
  })
  return Rating
}
