const config = require('../config')
// const db = require('../models')

const jwt = require('jsonwebtoken')
const passport = require('passport')
// const LocalStrategy  = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy
const secret = config.jwt.secret
// const AppError = require('../utils/appErrors').createAppError
// const chalk = require('chalk')

passport.use(new BearerStrategy(function (token, cb){
  jwt.verify(token, secret, function(err, decoded) {
    if (err) return cb(err)
    const user = decoded
    return cb(null, user ? user : false)
  })
}))

// function login( auth, req ){
//   const email = auth.email.toLowerCase()
//   return new Promise((resolve, reject) => {
//     db.User.findOne({ where: { email }, include: [
//       { model: db.Address, as: 'address' }, { model: db.Contact, as: 'contacts' }
//      ] }).then(user => {
//       user.comparePassword(auth.password, (err, isMatch) => {
//         if (isMatch && !err){
//           const response = db.User.createAndReturnToken(user)
//           return req.login(null, () => resolve(response))
//         } else {
//           reject('Authentication failed. Please check your username and password.')
//         }
//       })
//     }).catch(err => { throw err })
//   })
// }
//
// module.exports = { login }
