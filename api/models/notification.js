'use strict'
module.exports = (sequelize, Sequelize) => {
  const Notification = sequelize.define('Notification', {
    userId: Sequelize.INTEGER,
    type: Sequelize.STRING,
    title: Sequelize.STRING,
    body: Sequelize.STRING
  })

  Notification.associate = function (models) {
    Notification.belongsTo(models.User)
  }

  return Notification
}
