const Auth = require('../../services/auth')
const getLoggedInUser = require('./users')

const authenticated = (parent, args, req, info) => {
  if (req.user) {
    return req.user
  }
}

const login = async (root, args, req) => {
  const loggedIn = await Auth.login({
    email: args.input.email, password: args.input.password, req })
  return loggedIn.dataValues
}

const logout = async (root, args, req) => {
  const loggedOut = await Auth.logout({req})
  return {email: loggedOut.email}
}

module.exports = {authenticated, login, logout}
