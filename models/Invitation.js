'use strict'
export default (sequelize, DataTypes) => {
  const Invitation = sequelize.define('invitation', {
    mailId: DataTypes.INTEGER,
    sentAt: DataTypes.DATE
  }, {
    classMethods: {
      associate(models) {
        Invitation.belongsTo(models.user)
      }
    }
  })
  return Invitation
}
