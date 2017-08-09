// const {compose} = require('recompose')
const { createOrder, agentOrders, agentOrder, openMissions } = require('./resolvers/orders')
const { fileResolver } = require('./resolvers/assets')
const Address = require('./resolvers/addresses')
// const getLoggedInUser = require('./resolvers/users')
const {authenticated, login, logout} = require('./resolvers/auth')

const resolvers = {
  Query: {
    currentUser: ( authenticated ),
    agentOrders: ( agentOrders ),
    agentOrder: ( agentOrder ),
    openMissions: ( openMissions )
  },
  Mutation: {
    login: ( login ),
    logout: ( logout ),
    createOrder: ( createOrder ),
    fileUpload: ( fileResolver )
  }
}
module.exports = resolvers
