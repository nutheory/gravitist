const {compose} = require('recompose')
const Order = require('./resolvers/orders')
const Address = require('./resolvers/addresses')
const getLoggedInUser = require('./resolvers/users')
const authenticated = require('./resolvers/auth')
const {login} = require('./resolvers/auth')

const resolvers = {
  Query: {
    user: compose([authenticated, getLoggedInUser]),
      // console.log('context',context.user)
      // return context.user
    // },
    orders: () => {
      return "hey"
    },
  },
  Mutation: {
    login: (login)
  }
}
module.exports = resolvers
