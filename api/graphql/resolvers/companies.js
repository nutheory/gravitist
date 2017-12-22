const { createResolver } = require('apollo-resolvers')
const { baseResolver, isAuthenticated, isAuthorized, isAgent } = require('./auth')
const { create, destroy, join, leave, update } = require('../../services/companies')
const uuidv4 = require('uuid/v4')
const chalk = require('chalk')

const createCompany = isAgent.createResolver(
  async (root, { input }, { user }) => {
    let company = input
    company.ownerId = user.id
    company.logo.uploaderId = user.id
    company.key = uuidv4()
    const result = await create(company)
    return result
  }
)

const joinCompany = isAgent.createResolver(
  async (root, { input }, { user }) => {
    const result = await join({ key: input.key, companyId: input.id, userId: user.id })
    return result
  }
)

const leaveCompany = isAgent.createResolver(
  async (root, { input }, { user }) => {
    const result = await leave({ companyName: input.name, userId: user.id })
    return result
  }
)

const updateCompany = isAuthorized.createResolver(
  async (root, { input }, { user }) => {
    const companyId = input.id
    const userId = user.id
    const details = { name: input.name, subtitle: input.subtitle,
      visible: input.visible, styles: input.styles, logo: input.logo }
    const updateDetails = { companyId, details }
    const result = await update(updateDetails)
    return result
  }
)

const destroyCompany = isAuthorized.createResolver(
  async (root, { input }, { user }) => {
    const result = await destroy(input.id, user.id)
    return result
  }
)

const companyResolvers = {

  // Query: {
  //
  // },

  Mutation: {
    createCompany,
    joinCompany,
    leaveCompany,
    updateCompany,
    destroyCompany
  }

}

module.exports = { companyResolvers }
