

module.exports = function(sequelize, Sequelize) {
  const AbortedMission = sequelize.define('AbortedMission', {
    orderId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    reason: {
      type: Sequelize.TEXT
    }
  })
  AbortedMission.associate = (models) => {
    AbortedMission.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'bailedMissions'
    })
    AbortedMission.belongsTo(models.Order, {
      foreignKey: 'orderId'
    })
  }
  return AbortedMission
}
