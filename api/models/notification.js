'use strict'
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('notification', {
    userId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    title: DataTypes.STRING,
    body: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        Notification.belongsTo(models.user)
      }
    }
  })
  return Notification
}
