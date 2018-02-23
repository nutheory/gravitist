const passport = require('passport')
const crypto = require('crypto')
const chalk = require('chalk')

const tokenAuthenticate = (req, res, next) => {
  if ( !req.headers.authorization || req.headers.authorization == undefined ){return next()}
  passport.authenticate('bearer', (err, user, info) => {
    if (err) { return next(err) }
    if (user) {
      req.user = user
    } else {
      return res.status(401).json()
    }
    return next()
  })(req, res, next)
}

const publicPassThrough = (req, res, next) => {
  let regEx
  let noAuthRequired = false
  const unprotectedMethods = [ 'getGallery', 'loginUser', 'createAgent', 'createPilot',
    'createEditor', 'createUser', 'createOrderWithUser' ]
  unprotectedMethods.map(method => {
    regEx = new RegExp(method)
    if (regEx.test(req.body.query)) {
      noAuthRequired = true
    }
  })

  if ( noAuthRequired || req.user ){
    return next()
  }

  return res.status(401).json()
}

const hmac = (key, value) => crypto.createHmac('sha256', key).update(value).digest()

const hexhmac = (key, value) => crypto.createHmac('sha256', key).update(value).digest('hex')

module.exports = { tokenAuthenticate, publicPassThrough, hmac, hexhmac }
