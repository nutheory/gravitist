'use strict'
module.exports = (sequelize, Sequelize) => {
  const Invitation = sequelize.define('Invitation', {
    mailId: Sequelize.INTEGER,
    sentAt: Sequelize.DATE,
    userId: Sequelize.INTEGER
  })

  Invitation.associate = function (models) {
    Invitation.belongsTo(models.User)
  }

  return Invitation
}
