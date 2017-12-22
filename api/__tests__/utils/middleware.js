const passport = require('passport')
const _ = require('lodash')
const chalk = require('chalk')

const tokenAuthenticate = (req, res, next) => {
  if ( !req.headers.authorization || req.headers.authorization == undefined ){return next()}
  passport.authenticate('bearer', (err, user, info) => {
    if (err) { return next(err) }
    if (user) {
      req.user = user
    } else {
      return res.status(401).json({ status: 'error', code: 'unauthorized' })
    }
    return next()
  })(req, res, next)
}

const publicPassThrough = (req, res, next) => {
  let regEx
  let noAuthRequired = false
  const unprotectedMethods = [ 'loginUser', 'createAgent', 'createPilot',
    'createEditor', 'createAdmin', 'createOrderWithUser' ]
  _.each(unprotectedMethods, (method) => {
    regEx = new RegExp(method)
    if (regEx.test(req.body.query)) {
      noAuthRequired = true
    }
  })
  if ( noAuthRequired || req.user ){
    return next()
  }
  return res.status(401).json({ status: 'error', code: 'unauthorized' })
}

module.exports = { tokenAuthenticate, publicPassThrough }
