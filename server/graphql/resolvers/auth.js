const Auth = require('../../services/auth')
const getLoggedInUser = require('./users')
const auth = new Auth

const authenticated = (parent, args, context, info) => {
    console.log('context', context)

    if (context.user) {
      console.log('CCCCCCCONTEXT')
      return fn(parent, args, context, info)
    }
    throw new Error('User is not authenticated!!!')
  }

const login = (root, args, req) => {
  console.log('found', args)
  const loggedIn = auth.login({
    email: args.input.email,
    password: args.input.password,
    req
  })
  console.log('loggedIn', loggedIn)
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
