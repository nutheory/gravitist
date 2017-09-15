const config = require('../config')
const Db = require('../models')
const uuidv4 = require('uuid/v4')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const LocalStrategy  = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy
const User = Db.sequelize.models.user
const Address = Db.sequelize.models.address
const secret = config.jwt.secret
const AppError = require('../utils/appErrors').createAppError
const chalk = require('chalk')

passport.use(new BearerStrategy(function (token, cb){
  jwt.verify(token, secret, function(err, decoded) {
    if (err) return cb(err)
    const user = decoded
    return cb(null, user ? user : false)
  })
}))

function createToken(user){
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    customerId: user.customerId,
    type: user.type,
    address: user.address
  }
}

function login(auth, req){
  const email = auth.email.toLowerCase()
  return new Promise((resolve, reject) => {
    User.findOne({ where: { email }, include: [ Address ] }).then(user => {
      user.comparePassword(auth.password, (err, isMatch) => {
        const user_token_info = createToken(user)
        if (isMatch && !err){
          const token = jwt.sign(user_token_info, secret, {
            expiresIn: "20 days"
          })
          const response = { user: user.dataValues, auth: { token: `bearer ${token}` } }
          return req.login(null, () => resolve(response))
        } else {
          reject('Authentication failed. Please check your username and password.')
        }
      })
    })
  })
}

function isAuthorized(func, { args, req, objSecId, types, funcName, klass}){
  const objAccess = types
  const objOwner = objSecId || req.user.id
  if ( req.user.type == "admin" || (objAccess.includes(req.user.type) && req.user.id == objOwner) ) {
    return func(null, args, req)
  } else {
    throw( AppError( {
      type: `AccessDenied.${funcName}.code:${objSecId}`,
      message: `Access Denied. You have insuffecient access privileges.`,
      details: `User: ${req.user}, Obj: ${objOwner}, UserTypes: ${objAccess}`,
      errorCode: 401
    } ) )
  }
}

module.exports = { isAuthorized, login }
