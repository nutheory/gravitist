const { createResolver } = require('apollo-resolvers')
const { baseResolver, isAuthenticated, isAuthorized } = require('./auth')
const { Validate } = require('../../utils/validation')
const { createStripeSource, destroyStripeSource, getStripeCustomer,
  setDefaultStripeSource } = require('../../services/payments')
const chalk = require('chalk')

const getCustomer = isAuthorized.createResolver(
  async ( root, { input }, { user } ) => {
    return await getStripeCustomer(input.customerId)
  }
)

const createSource = isAuthorized.createResolver(
  async ( root, { input }, { user } ) => {
    const { customerId, token } = input
    return await createStripeSource( customerId, token )
  }
)

const destroySource = isAuthorized.createResolver(
  async ( root, { input }, { user } ) => {
    const { customerId, cardId } = input
    return await destroyStripeSource( customerId, cardId )
  }
)

const setDefaultSource = isAuthorized.createResolver(
  async ( root, { input }, { user } ) => {
    const { customerId, sourceId } = input
    return await setDefaultStripeSource( customerId, sourceId )
  }
)



const paymentResolvers = {

  Query: {
    getCustomer
  },

  Mutation: {
    setDefaultSource,
    createSource,
    destroySource
  }

}

module.exports = { paymentResolvers }
