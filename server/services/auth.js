const passport = require('passport')
const passportJWT = require('passport-jwt')
const jwt = require('jsonwebtoken')
const config = require('../config')
const Db = require('../models')
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy
const User = Db.sequelize.models.user
let jwtOpts = {}

jwtOpts.jwtFromRequest = ExtractJwt.fromAuthHeader()
jwtOpts.secretOrKey = config.jwt.secret

passport.use(new JwtStrategy(jwtOpts, (jwt_payload, done) => {
  console.log('pass check')
  // console.log('payload received', jwt_payload.id)
  const user = User.findOne({id: jwt_payload.id}, (err, user) => {
    if (err){ return done(err, false) }
    if (user) {
      done(null, user)
    } else {
      done(null, false, 'Invalid Credentials')
    }
  })
}))

function createToken(user) {
  return {
    id: user.id,
    name: user.name,
    accountId: user.accountId,
    email: user.email,
    type: user.type
  }
}

function signup({ email, password, name, type, req }) {
  if (!email || !name || !password || !type) { throw new Error('Please provide required info.') }
  return User.findOne({ where: { email } }).then(existingUser => {
    if (existingUser) { throw new Error('Email in use') }
    email = email.toLowerCase()
    return User.create({ email, password, name, type })
  }).then(user => {
    return new Promise((resolve, reject) => {
      console.log('req', req.logIn)
      req.login(user, { session: false }, (err) => {
        if (err) { reject(err) }
        resolve(user)
      })
    })
  })
}

function login({ email, password, req }) {
  email = email.toLowerCase()
  return new Promise((resolve, reject) => {
    User.findOne({ where: { email } }).then(user => {
      user.comparePassword(password, (err, isMatch) => {
        const user_token_info = createToken(user)
        if (isMatch && !err){
          let token = jwt.sign(user_token_info, jwtOpts.secretOrKey, {
            expiresIn: 50000
          })
          user.token = token
          req.login(null, () => resolve(user))
        } else {
          reject('Authentication failed. Please check your username and password.')
        }
      })
    })
  })
}

module.exports = { signup, login }

// passport.authenticate('JwtStrategy', { session: false }), (err, user) => {
//   if (!user) { reject('Invalid credentials.') }
//
//   req.login(user, () => resolve(user))
// })({ body: { email, password } })
