const Auth = require('../../services/auth')
const getLoggedInUser = require('./users')
const auth = new Auth

const authenticated = (parent, args, context, info) => {
    // console.log(fn)

    if (context.user) {
      console.log('CCCCCCCONTEXT')
      return fn(parent, args, context, info)
    }
    throw new Error('User is not authenticated!!!')
  }

const login = (root, args, req) => {
  const loggedIn = auth.login({
    email: args.input.email,
    password: args.input.password,
    req
  })
  return loggedIn
}

const logout = (root, args, req) => {
  const loggedIn = auth.login({
    email: args.input.email,
    password: args.input.password,
    req
  })
  return loggedIn
}


// }

module.exports = {authenticated, login, logout}
