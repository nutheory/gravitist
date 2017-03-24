'use strict'
export default (sequelize, DataTypes) => {
  const Invitation = sequelize.define('Invitation', {
    mailId: DataTypes.INTEGER,
    sent: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate(models) {
        Invitation.belongsTo(models.User, {
          foreignKey: 'userId'
        })
      }
    }
  })
  return Invitation
}
