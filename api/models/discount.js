'use strict'
module.exports = (sequelize, Sequelize) => {
  const Discount = sequelize.define('Discount', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    createdBy: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    appliesTo: {
      values: ['standard', 'premium', 'all'],
      type: Sequelize.ENUM
    },
    code: {
      allowNull: false,
      type: Sequelize.STRING
    },
    amount: {
      allowNull: false,
      type: Sequelize.STRING
    },
    startsAt: Sequelize.DATE,
    endsAt: Sequelize.DATE,
    usageCount: Sequelize.INTEGER,
    maxUsageCount: Sequelize.INTEGER,
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  })

  Discount.associate = function (models) {
    Discount.belongsTo(models.User, {
      foreignKey: 'createdBy',
    })
  }

  return Discount
}
