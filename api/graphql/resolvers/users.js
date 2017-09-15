const { validateUserInput, uniqueEmail, createStripeCustomer, UserProfile,
  CreateUser, UpdateUser, DestroyUser } = require('../../services/users')
const { validateAddressInput, createAdress, destroyAddress } = require('../../services/addresses')
const AppError = require('../../utils/appErrors').createAppError
const { mustHaveId } = require('../../utils/helpers')
const _ = require('lodash')
const chalk = require('chalk')

async function createAgent( root, args, req ){
  const email = await uniqueEmail( args.input.user.email )
    .catch(err => { throw err })
  const customer = await createStripeCustomer( args.input.user )
  const inputs = _.merge(args.input.user, { email: email, customerId: customer.id, type: "agent" })
  const validatedUser = await validateUserInput( inputs )
  const result = await CreateUser( validatedUser, req )
  return result
}

async function createPilot( root, args, req ){
  const email = await uniqueEmail( args.input.user.email )
    .catch(err => { throw err })
  const customer = await createStripeCustomer( args.input.user )
  const inputs = _.merge(args.input.user, { email: email, customerId: customer.id, type: "pilot" })
  const validatedUser = await validateUserInput( inputs )
  const validatedAddress = await validateAddressInput( args.input.user.address )
  validatedUser.address = validatedAddress
  const result = await CreateUser( validatedUser, req )
  return result
}

async function createEditor(root, args, req){
  const email = await uniqueEmail( args.input.user.email )
    .catch(err => { throw err })
  const customer = await createStripeCustomer( args.input.user )
  const inputs = _.merge( args.input.user, { email: email, customerId: customer.id, type: "editor" } )
  const validatedUser = await validateUserInput( inputs )
  const result = await CreateUser( validatedUser, req )
  return result
}

async function createAdmin(root, args, req){
  const email = await uniqueEmail( args.input.user.email )
    .catch(err => { throw err })
  const inputs = _.merge(args.input.user, { email: email, type: "admin" })
  const validatedUser = await validateUserInput( inputs )
  const result = await CreateUser( validatedUser, req )
  return result
}

async function updateUser( root, args, req ){
  const id = await mustHaveId(args.input.id)
  if (args.input.stripeToken){
    const customer = await createStripeCustomer( args.input )
    args.input.customerId = customer.id
  }
  args.input.type = req.user.type
  let validatedUser = await validateUserInput( args.input )
  validatedUser.id = id
  const result = await UpdateUser( validatedUser, req )
  return result
}

async function destroyUser( root, args, req ){
  const id = await mustHaveId(args.input.itemId)
  const result = await DestroyUser( id, req )
  return result
}

async function userProfile( root, args, req ){
  const result = await UserProfile(args.id).then( res => {
    return { user: res.dataValues }
  })
  return result
}

module.exports = { createAgent, createPilot, createEditor, createAdmin, updateUser, destroyUser, userProfile }
