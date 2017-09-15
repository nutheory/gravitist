'use strict'
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('note', {
    notableId: DataTypes.INTEGER,
    notableType: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        Note.belongsTo(models.order)
        Note.belongsTo(models.user)
        Note.belongsTo(models.asset)
      }
    }
  })
  return Note
}
