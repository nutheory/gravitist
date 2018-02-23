const jwt = require('jsonwebtoken')
const passport = require('passport')
const BearerStrategy = require('passport-http-bearer').Strategy
const secret = process.env.JWT_SECRET

passport.use(new BearerStrategy(function (token, cb){
  jwt.verify(token, secret, function(err, decoded) {
    if (err) return cb(err)
    const user = decoded
    return cb(null, user ? user : false)
  })
}))
