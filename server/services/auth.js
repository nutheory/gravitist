// const passport = require('passport')
// const passportJWT = require('passport-jwt')
const jwt = require('jsonwebtoken')
const config = require('../config')
const Db = require('../models')
// const ExtractJwt = passportJWT.ExtractJwt
// const JwtStrategy = passportJWT.Strategy
const UserDB = Db.sequelize.models.user


class Auth {

  // constructor(){
  //   this.jwtOpts = {
  //     jwtFromRequest: ExtractJwt.fromAuthHeader(),
  //     secretOrKey: config.jwt.secret
  //   }
  //
  //   this.setup()
  // }
  //
  // setup(){
  //   passport.use(new JwtStrategy(this.jwtOpts, (jwt_payload, done) => {
  //     console.log('jwt_payload', jwt_payload)
  //     UserDB.findOne({id: jwt_payload.id}, (err, user) => {
  //       if (err) {
  //           return done(err, false)
  //       }
  //       if (user) {
  //           return done(null, user)
  //       } else {
  //           return done(null, false)
  //           // or you could create a new account
  //       }
  //     })
  //   }))
  // }

  login({ email, password, req }){
    email = email.toLowerCase()
    return new Promise((resolve, reject) => {
      UserDB.findOne({ where: { email } }).then(user => {
        user.comparePassword(password, (err, isMatch) => {
          const user_token_info = this.createToken(user.dataValues)
          if (isMatch && !err){
            let token = jwt.sign(user_token_info, config.jwt.secret, {
              expiresIn: "20 days",
              subject: JSON.stringify(user_token_info)
            })
            const returnUser = {
              id: user.dataValues.id,
              name: user.dataValues.name,
              email: user.dataValues.email,
              type: user.dataValues.type,
              token: token
            }
            resolve(returnUser)
          } else {
            reject('Authentication failed. Please check your username and password.')
          }
        })
      })
    })
  }


  createToken(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      accountId: user.accountId,
      type: user.type
    }
  }

}

export default Auth

// passport.use(new JwtStrategy(jwtOpts, (jwt_payload, done) => {
//   console.log('pass check')
//   // console.log('payload received', jwt_payload.id)
//   const user = User.findOne({id: jwt_payload.id}, (err, user) => {
//     if (err){ return done(err, false) }
//     if (user) {
//       done(null, user)
//     } else {
//       done(null, false, 'Invalid Credentials')
//     }
//   })
// }))


// function createToken(user) {
//   return {
//     id: user.id,
//     name: user.name,
//     accountId: user.accountId,
//     email: user.email,
//     type: user.type
//   }
// }

// function signup(email, password, name, type){
//   console.log('email', email)
//
//   if (!email || !name || !password || !type) { throw new Error('Please provide required info.') }
//   return User.findOne({ where: { email } }).then(existingUser => {
//     if (existingUser) { throw new Error('Email in use') }
//     email = email.toLowerCase()
//     return User.create({ email, password, name, type })
//   }).then(user => {
//     return new Promise((resolve, reject) => {
//       login(user, { session: false }, (err) => {
//         if (err) { reject(err) }
//         resolve(user)
//       })
//     })
//   })
// }

// function login({ email, password }){
//   email = email.toLowerCase()
//   return new Promise((resolve, reject) => {
//     User.findOne({ where: { email } }).then(user => {
//       user.comparePassword(password, (err, isMatch) => {
//         const user_token_info = createToken(user)
//         if (isMatch && !err){
//           let token = jwt.sign(user_token_info, jwtOpts.secretOrKey, {
//             expiresIn: 50000
//           })
//           user.token = token
//           login(null, () => resolve(user))
//         } else {
//           reject('Authentication failed. Please check your username and password.')
//         }
//       })
//     })
//   })
// }
//
// module.exports = { signup, login }
