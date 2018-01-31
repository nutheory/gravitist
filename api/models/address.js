const chalk = require('chalk')

module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define('Address', {
    addressableId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: 'uniqueAddress'
    },
    addressable: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: 'uniqueAddress'
    },
    addressableName: Sequelize.STRING,
    name: Sequelize.STRING,
    address1: {
      type: Sequelize.STRING,
    },
    address2: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zipCode: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
      defaultValue: 'residence',
      validate:{
        isIn: {
          args: [['residence', 'commercial']],
          msg: 'Address type is invalid'
        }
      }
    },
    lat:  {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    lng: {
      type: Sequelize.FLOAT,
      allowNull: false
    }
  })

  Address.updateFields = () => {
    return [ 'name', 'address1', 'address2', 'city', 'state', 'zipCode', 'type', 'lat', 'lng' ]
  }

  Address.associate = (models) => {
    Address.belongsTo(models.User, {
      foreignKey: {
        name: 'addressableId',
        unique: 'uniqueAddress'
      },
      constraints: false,
      as: 'user'
    })
    Address.belongsTo(models.Order, {
      foreignKey: {
        name: 'addressableId',
        unique: 'uniqueAddress'
      },
      constraints: false,
      as: 'order'
    })
    Address.belongsTo(models.Company, {
      foreignKey: 'addressableId',
      constraints: false,
      as: 'company'
    })
  }

  Address.afterCreate(async (user, options) => {
    // console.log(chalk.blue.bold('IM UPDATING ADDRESS'), user)
  })

  return Address
}
