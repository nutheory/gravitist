const { createResolver } = require('apollo-resolvers')
const { baseResolver, isAuthenticated, isAuthorized } = require('./auth')
const { Validate } = require('../../utils/validation')
const { RequiredFieldsError, UniqueEmailError } = require("../../utils/errors")
const { create, update, destroy, profile, login } = require('../../services/users')
const chalk = require('chalk')

const currentUser = baseResolver.createResolver(
  ( root, { input }, { user }) => {
    console.log(chalk.blue.bold("USER"),user)
    return { user }
  }
)

const getProfile = isAuthorized.createResolver(
  async ( root, { input }, { user } ) => {
    const result = await profile({ id: input.id })
    return result
  }
)

const createAgent = baseResolver.createResolver(
  async ( root, { input }, req ) => {
    input.user.type = "agent"
    const valid = await Validate( input ).isValidUser().isUniqueEmail().done()
    if( !valid ){ throw new Error('hjfjhfjhfjj', '0898978787878') }
    const result = await create( input.user )
    return result
  }
)

const createPilot = baseResolver.createResolver(
  async ( root, { input }, req ) => {
    input.user.type = "pilot"
    const valid = await Validate( input ).isValidUser().isUniqueEmail().done()
    if( !valid ){ return valid }
    const result = await create( input.user )
    return result
  }
)

const createEditor = baseResolver.createResolver(
  async ( root, { input }, req ) => {
    input.user.type = "editor"
    const valid = await Validate( input ).isValidUser().isUniqueEmail().done()
    if( !valid ){ return valid }
    const result = await create( input.user )
    return result
  }
)

const createAdmin = baseResolver.createResolver(
  async ( root, { input }, req ) => {
    input.user.type = "admin"
    const valid = await Validate( input ).isValidUser().isUniqueEmail().done()
    if( !valid ){ return valid }
    const result = await create( input.user )
    return result
  }
)

const updateUser = isAuthorized.createResolver(
  async ( root, { input }, req ) => {
    const valid = await Validate(input, [ 'id' ])
    if( !valid ){ return valid }
    const result = await update( input )
    return result
  }
)

const destroyUser = isAuthorized.createResolver(
  async ( root, { input }, req ) => {
    const result = await destroy( input )
    return result
  }
)

const loginUser = baseResolver.createResolver(
  async (root, { input }, req) => {
    const { email, password } = input
    const result = await login({ email, password })
    return result
  }
)


const userResolvers = {

  Query: {
    getProfile,
    currentUser
  },

  Mutation: {
    loginUser,
    createAgent,
    createPilot,
    createEditor,
    createAdmin,
    updateUser,
    destroyUser
  }

}

module.exports = { userResolvers, createAgent }
