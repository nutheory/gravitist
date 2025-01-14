const { createResolver } = require('apollo-resolvers')
const { baseResolver, isAuthenticated, isAuthorized, isAdmin } = require('./auth')
const { Validate } = require('../../utils/validation')
const { RequiredFieldsError, UniqueEmailError } = require("../../utils/errors")
const { create, update, destroy, profile, verify, login, refresh, collection, initReset, reset, deactivate } = require('../../services/users')
const { pilotRegistrationMailer, resetPasswordMailer } = require('../../mailers/user')
const chalk = require('chalk')

const currentUser = baseResolver.createResolver(
  ( root, { input }, { user }) => {
    console.log(chalk.blue.bold("USER"),user)
    return { user }
  }
)

const getUser = isAuthorized.createResolver(
  async ( root, { input }, { user } ) => {
    const result = await profile({ attrs: { id: input.id } })
    return result
  }
)

const createAgent = baseResolver.createResolver(
  async ( root, { input }, req ) => {
    input.user.type = "agent"
    const result = await create( input.user )
    return result
  }
)

const createPilot = baseResolver.createResolver(
  async ( root, { input }, req ) => {
    input.user.type = "pilot"
    const result = await create( input.user )
    pilotRegistrationMailer(result)
    return result
  }
)

const createUser = baseResolver.createResolver(
  async ( root, { input }, req ) => {
    if(input.user.type !== 'unapproved_admin'){ return true }
    const result = await create( input.user )
    return result
  }
)

const updateUser = isAuthorized.createResolver(
  async ( root, { input }, req ) => {
    const valid = await Validate(input, [ 'id' ])
    if( !valid ){ return valid }
    const result = await update({ attrs: input })
    return result
  }
)

const verifyUser = isAuthorized.createResolver(
  async ( root, { input }, req ) => {
    const result = await verify({ attrs: input })
    return result
  }
)

const destroyUser = isAuthorized.createResolver(
  async ( root, { input }, req ) => {
    const result = await destroy({ attrs: input })
    return result
  }
)

const loginUser = baseResolver.createResolver(
  async (root, { input }, req) => {
    const { email, password } = input
    const result = await login({attrs: { email, password }})
    return result
  }
)

const tokenRefreshCheck = baseResolver.createResolver(
  async ( root, { input }, { user } ) => {
    const result = await refresh({ attrs: { id: user.id } })
    return result
  }
)

const getUsers = isAuthorized.createResolver(
  async ( root, { input }, req ) => {
    const result = await collection({ attrs: input })
    return result
  }
)

const initResetPassword = baseResolver.createResolver(
  async ( root, { input }, req ) => {
    const result = await initReset({ attrs: { email: input.email }})
    resetPasswordMailer(result)
    return result
  }
)

const resetPassword = baseResolver.createResolver(
  async ( root, { input }, req ) => {
    const result = await reset({ attrs: input })
    return result
  }
)

const deactivateUser = isAdmin.createResolver(
  async ( root, { input }, req ) => {
    const result = await deactivate({ attrs: input })
    return result
  }
)

const userResolvers = {

  Query: {
    getUser,
    getUsers,
    currentUser,
    tokenRefreshCheck
  },

  Mutation: {
    loginUser,
    createAgent,
    createPilot,
    createUser,
    updateUser,
    verifyUser,
    destroyUser,
    initResetPassword,
    resetPassword,
    deactivateUser
  }

}

module.exports = { userResolvers, createAgent }
