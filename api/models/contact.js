'use strict'
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('contact', {
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    companyId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate(models) {
        Contact.belongsTo(models.user)
        Contact.belongsTo(models.company)
      }
    }
  })
  return Contact
}
