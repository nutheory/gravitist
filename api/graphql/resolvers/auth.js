const Auth = require('../../services/auth')

const authenticated = (parent, args, req, info) => {
  if (req.user) {
    return req.user
  }
}

const login = async (root, args, req) => {
  const loggedIn = await Auth.login({
    email: args.input.email,
    password: args.input.password
  }, req)
  return loggedIn
}

module.exports = { authenticated, login }
