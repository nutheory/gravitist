const { createOrder, createOrderWithUser, agentOrders, agentOrder, missions,
  destroyOrder } = require('./resolvers/orders')
// const { fileResolver } = require('./resolvers/assets')
const { createAgent, createPilot, createEditor, userProfile, createAdmin,
  updateUser, destroyUser } = require('./resolvers/users')
const { login } = require('./resolvers/auth')
const { isAuthorized } = require('../services/auth')
const chalk = require('chalk')

const resolvers = {
  Query: {
    userProfile: ((root, args, req) => {
      return isAuthorized(userProfile, { args, req, objSecId: args.id,
        types: ["agent", "pilot", "editor"] })}),
    agentOrders: ( agentOrders ),
    agentOrder: ( agentOrder ),
    missions: ( missions )
  },

  Mutation: {
    login: ( login ),
    createOrder: ( (root, args, req) => {
      return isAuthorized(createOrder, { args, req, types: ["agent"] })}),
    createOrderWithUser: ( createOrderWithUser ),
    createAgent: ( createAgent ),
    createPilot: ( createPilot ),
    createEditor: ( createEditor ),
    createAdmin: ( createAdmin ),
    updateUser: ((root, args, req) => {
      return isAuthorized(updateUser, { args, req, itemId: args.input.itemId,
        types: ["agent", "pilot", "editor"] })}),
    destroyUser: ((root, args, req) => {
      return isAuthorized(destroyUser, { args, req, itemId: args.input.itemId,
        types: ["agent", "pilot", "editor"] })}),
    destroyOrder: ( (root, args, req) => {
      return isAuthorized(destroyOrder, { args, req, itemId: args.input.itemId,
        ownerId:args.input.ownerId, types: ["agent"] })}),
  }
}
module.exports = resolvers
