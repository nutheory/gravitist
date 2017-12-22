const passport = require('passport')
// const _ = require('lodash')
const chalk = require('chalk')

const tokenAuthenticate = (req, res, next) => {
  console.log(chalk.blue.bold('HIT HERE'), req)
  if ( !req.headers.authorization || req.headers.authorization == undefined ){return next()}
  passport.authenticate('bearer', (err, user, info) => {
    if (err) { return next(err) }
    if (user) {
      req.user = user
    } else {
      return res.status(404).json()
    }
    return next()
  })(req, res, next)
}

const publicPassThrough = (req, res, next) => {
  console.log(chalk.blue.bold('HIT HERE 2'), req.body)
  let regEx
  let noAuthRequired = false
  const unprotectedMethods = [ 'loginUser', 'createAgent', 'createPilot',
    'createEditor', 'createAdmin', 'createOrderWithUser' ]
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

module.exports = { tokenAuthenticate, publicPassThrough }
