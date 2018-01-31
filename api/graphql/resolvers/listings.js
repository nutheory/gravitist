const { createResolver } = require('apollo-resolvers')
const { baseResolver, isAuthenticated, isAuthorized, isAgent } = require('./auth')
const { create, update } = require('../../services/listings')
const chalk = require('chalk')

const createListing = isAuthenticated.createResolver(
  async (root, { input }, { user }) => {
    const listing = await create(input.listing)
    return listing
  }
)

const updateListing = isAuthorized.createResolver(
  async (root, { input }, { user }) => {
    const listing = await update(input)
    return listing
  }
)

const listingResolvers = {

  Mutation: {
    createListing,
    updateListing
  }

}

module.exports = { listingResolvers }
