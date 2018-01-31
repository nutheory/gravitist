const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')
const secret = config.jwt.secret
const { createStripeCustomer } = require('../services/payments')
const chalk = require('chalk')

module.exports = function(sequelize, Sequelize) {
  const User = sequelize.define('User', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    customerId: Sequelize.STRING,
    accountId: Sequelize.STRING,
    companyId: Sequelize.INTEGER,
    companyOwner: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      set(val) {
        this.setDataValue('email', val.toLowerCase())
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      validate: {
        isIn: [[ 'agent', 'pilot', 'unapproved_editor', 'unapproved_admin', 'editor', 'admin' ]]
      }
    },
    bio: Sequelize.TEXT,
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    workRadius: Sequelize.INTEGER,
    payRate: Sequelize.DECIMAL,
    refreshToken: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    termsAccepted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    superAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  })

  User.createFields = (type) => {
    let fields
    switch(type) {
    case "agent": fields = [ 'email', 'type', 'password', 'bio', 'name', 'customerId',
      'address', 'contacts' ]; break;
    case "pilot": fields = [ 'email', 'type', 'password', 'bio', 'name', 'payrate',
      'workRadius', 'customerId', 'address', 'contacts' ]; break;
    case "editor": fields = [ 'email', 'type', 'password', 'bio', 'name', 'payrate',
      'customerId' ]; break;
    case "admin": fields = [ 'email', 'type', 'password', 'bio', 'name', 'payrate',
      'customerId' ]; break;
    }
    return fields
  }


  User.updateFields = (type) => {
    let fields
    switch(type) {
    case "agent": fields = [ 'id', 'password', 'bio', 'name', 'address', 'contacts', 'email' ]; break;
    case "pilot": fields = [ 'id', 'password', 'bio', 'name', 'address', 'payrate', 'workRadius', 'email' ]; break;
    case "editor": fields = [ 'id', 'password', 'bio', 'name', 'address', 'payrate', 'email' ]; break;
    case "admin": fields = [ 'id', 'password', 'bio', 'name', 'address', 'payrate', 'workRadius', 'email' ]; break;
    }
    return fields
  }

  // Adding an instance level method
  User.prototype.comparePassword = async function (pw) {
    return await bcrypt.compare(pw, this.password).catch(err => { throw err })
  }

  User.prototype.isAdmin = (user) => {
    user.type == "admin"
  }

  User.prototype.isAgent = (user) => {
    user.type == "agent"
  }

  User.prototype.isPilot = (user) => {
    user.type == "pilot"
  }

  User.prototype.isEditor = (user) => {
    user.type == "editor"
  }

  User.associate = function (models) {
    User.belongsTo(models.Company, {
      foreignKey: 'companyId',
      as: 'company'
    })
    User.hasMany(models.Order, {
      foreignKey: 'agentId',
      as: 'agent'
    })
    User.hasMany(models.Order, {
      foreignKey: 'pilotId',
      as: 'pilot'
    })
    User.hasMany(models.Order, {
      foreignKey: 'editorId',
      as: 'editor'
    })
    User.hasMany(models.Contact, {
      foreignKey: 'contactableId',
      onDelete: 'CASCADE',
      scope: {
        contactable: 'user'
      },
      as: 'contacts'
    })
    User.hasMany(models.Invitation, {
      foreignKey: 'userId'
    })
    User.hasMany(models.Notification, {
      foreignKey: 'authorId'
    })
    User.hasOne(models.Address, {
      foreignKey: 'addressableId',
      constraints: false,
      onDelete: 'CASCADE',
      scope: {
        addressable: 'user',
      },
      as: 'address'
    })
    User.hasOne(models.Address, {
      foreignKey: 'addressableId',
      constraints: false,
      onDelete: 'CASCADE',
      scope: {
        addressable: 'user',
        addressableName: 'pilot'
      },
      as: 'pilotAddress'
    })
    User.hasMany(models.Asset, {
      foreignKey: 'assetableId',
      constraints: false,
      scope: {
        assetable: 'user',
        assetableName: 'avatar'
      },
      as: 'avatars'
    })
    User.hasMany(models.Asset, {
      foreignKey: 'assetableId',
      constraints: false,
      scope: {
        assetable: 'user',
        assetableName: 'license'
      },
      as: 'licenses'
    })
    User.hasMany(models.Asset, {
      foreignKey: 'assetableId',
      constraints: false,
      scope: {
        assetable: 'user',
        assetableName: 'insurance'
      },
      as: 'insurances'
    })
    User.hasOne(models.Asset, {
      foreignKey: 'assetableId',
      constraints: false,
      scope: {
        assetable: 'user',
        assetableName: 'avatar',
        active: true
      },
      as: 'avatar'
    })
    User.hasOne(models.Asset, {
      foreignKey: 'assetableId',
      constraints: false,
      scope: {
        assetable: 'user',
        assetableName: 'license',
        active: true
      },
      as: 'license'
    })
    User.hasOne(models.Asset, {
      foreignKey: 'assetableId',
      constraints: false,
      scope: {
        assetable: 'user',
        assetableName: 'insurance',
        active: true
      },
      as: 'insurance'
    })
  }

  User.buildToken = ( user ) => {
    const newToken = {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
      isVerified: user.isVerified
    }
    if ( user.customerId ) { newToken.customerId = user.customerId }
    if ( user.accountId ) { newToken.accountId = user.accountId }
    if ( user.termsAccepted ) { newToken.termsAccepted = user.termsAccepted }
    if ( user.workRadius ) { newToken.workRadius = user.workRadius }
    if ( user.address ) { newToken.address = user.address }
    if ( user.avatar ) { newToken.avatar = user.avatar }
    if ( user.contacts ) { newToken.contacts = user.contacts }

    return newToken
  }

  User.createAndReturnToken = async function ({ usr }) {
    let userTokenInfo = User.buildToken(usr.dataValues)
    const token = await jwt.sign(userTokenInfo, secret, {
      expiresIn: "30 days"
    })
    return { user: usr, auth: { token: `bearer ${token}` } }
  }

  User.beforeCreate(async ( user, { stripeToken } ) => {
    const customerPromise = createStripeCustomer(user, stripeToken)
    const passwordPromise = bcrypt.hash(user.password, 10)
    const [ customer, password ] = await Promise.all([ customerPromise, passwordPromise ])
    return Object.assign(user, { customerId: customer.id, password })
  })

  User.beforeUpdate(async (user, options) => {
    if(user.changed('password')) {
      return bcrypt.hash(user.password, 10).then(hash => { user.password = hash })
    }
  })

  User.afterUpdate(async (user, options) => {

  })


  return User

}
