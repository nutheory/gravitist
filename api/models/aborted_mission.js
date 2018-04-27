

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
  // Aborted.associate = (models) => {
  //   Aborted.belongsTo(models.User, {
  //     // has many?
  //   }
  // }
  return AbortedMission
}
