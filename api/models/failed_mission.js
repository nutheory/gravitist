module.exports = function(sequelize, Sequelize) {
  const FailedMission = sequelize.define('FailedMission', {
    orderId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    rejectedBy: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    typeOfFailure: {
      type: Sequelize.STRING,
      allowNull: false,
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

  FailedMission.associate = (models) => {
    FailedMission.belongsTo(models.User, {
      foreignKey: 'userId',
      constraints: false,
      as: 'failedMissions'
    })
    FailedMission.belongsTo(models.Order, {
      foreignKey: 'orderId',
      as: 'order'
    })
    FailedMission.belongsTo(models.User, {
      foreignKey: 'rejectedBy',
      constraints: false,
      as: 'rejectedByUser'
    })
  }
  return FailedMission
}
