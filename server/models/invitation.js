'use strict'
module.exports = (sequelize, DataTypes) => {
  const Invitation = sequelize.define('invitation', {
    mailId: DataTypes.INTEGER,
    sentAt: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate(models) {
        Invitation.belongsTo(models.user)
      }
    }
  })
  return Invitation
}
