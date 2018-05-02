module.exports = function(sequelize, Sequelize) {
  const ErrorLog = sequelize.define('ErrorLog', {
    errorableId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    errorable: {
      allowNull: false,
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    name: {
      type: Sequelize.STRING
    },
    message: {
      type: Sequelize.STRING
    },
    reason: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    jsonResponse: {
      type: Sequelize.JSONB
    }
  })
  ErrorLog.associate = (models) => {
    ErrorLog.belongsTo(models.Order, {

    })
  }
  return ErrorLog
}
