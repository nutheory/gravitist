const {compose} = require('recompose')
const Order = require('./resolvers/orders')
const { fileResolver } = require('./resolvers/assets')
const Address = require('./resolvers/addresses')
const getLoggedInUser = require('./resolvers/users')
const {authenticated, login, logout} = require('./resolvers/auth')

const resolvers = {
  Query: {
    current_user: ( authenticated ),

      // console.log('context',context.user)
      // return context.user
    // },
    orders: () => {
      return "hey"
    },
  },
  Mutation: {
    login: ( login ),
    logout: ( logout ),
    fileUpload: ( fileResolver )
  }
}
module.exports = resolvers
