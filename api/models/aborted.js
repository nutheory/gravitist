

module.exports = function(sequelize, Sequelize) {
  const Aborted = sequelize.define('Aborted', {
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
  return Aborted
}
