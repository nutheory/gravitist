const config = require('../config')
const Db = require('../models')
const uuidv4 = require('uuid/v4')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const UserDB = Db.sequelize.models.user


passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  return UserDB.findById(id).then((user) => {
    if (user) {
      done(null, user.get())
    } else {
      done(user.errors, null)
    }
  })
})

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  console.log('start')
  UserDB.findOne({ where: {email: email.toLowerCase()} }).then(user => {
    console.log('user', user)
    if (!user) { return done(null, false, 'Invalid Credentials') }
    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err) }
      if (isMatch) {
        console.log('match', isMatch)
        return done(null, user)
      }
      return done(null, false, 'Invalid credentials.')
    })
  })
}))

function login({ email, password, req }) {
  console.log('email', email)
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) { reject('Invalid credentials.') }

      req.login(user, () => resolve(user))
    })({ body: { email, password } })
  })
}

function logout({ req }) {

  console.log('@@@@@@@@@@@@@@@@REQ', req.user)
  const { user } = req
  req.logout()
  console.log('@@@@@@@@@@@@@@@@', user)
  return user
}


module.exports = { login, logout }
