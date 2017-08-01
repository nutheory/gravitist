'use strict'
module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define('asset', {
    assetableId: DataTypes.INTEGER,
    assetableType: DataTypes.STRING,
    filename: DataTypes.STRING,
    filetype: DataTypes.STRING,
    url: DataTypes.STRING,
    filesize: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    classMethods: {
      associate(models) {
        Asset.belongsTo(models.company, {
          foreignKey: 'logoId',
          constraints: false,
          as: 'logo'
        })
        Asset.belongsTo(models.user, {
          foreignKey: 'assetableId',
          constraints: false,
          as: 'asset'
        })
        Asset.belongsTo(models.order, {
          foreignKey: 'assetableId',
          constraints: false,
          as: 'order'
        })
      }
    }
  })
  return Asset
}
