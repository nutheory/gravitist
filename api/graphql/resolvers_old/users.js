// const { CreateStripeCustomer, RetrieveCustomer } = require('../../services/stripe')
// const { UserProfile, CreateUser, UpdateUser, DestroyUser, validateUserInput, uniqueEmail } = require('../../services/users')
// const { validateAddressInput, createAdress, destroyAddress } = require('../../services/addresses')
// const AppError = require('../../utils/appErrors').createAppError
// const { mustHaveId } = require('../../utils/helpers')
// const _ = require('lodash')
// const chalk = require('chalk')

// async function createAgent( root, args, req ){
  // const email = await uniqueEmail( args.input.user.email )
  //   .catch(err => { throw err })
  // const customer = await CreateStripeCustomer( args.input.user )
  // const inputs = _.merge(args.input.user, { email: email, customerId: customer.id, type: "agent" })
  // const validatedUser = await validateUserInput( inputs )
  // const result = await CreateUser( validatedUser, req )
  // return result
// }

// async function createPilot( root, args, req ){
  // const email = await uniqueEmail( args.input.user.email )
  //   .catch(err => { throw err }) MOVE TO RESOLVER
  // const customer = await CreateStripeCustomer( args.input.user )
  // const inputs = _.merge(args.input.user, { email: email, customerId: customer.id, type: "pilot" })
  // const validatedUser = await validateUserInput( inputs )
  // const validatedAddress = await validateAddressInput( args.input.user.address )
  // validatedUser.address = validatedAddress
  // const result = await CreateUser( validatedUser, req )
  // return result
// }

// async function createEditor(root, args, req){
//   const email = await uniqueEmail( args.input.user.email )
//     .catch(err => { throw err })
//   const customer = await CreateStripeCustomer( args.input.user )
//   const inputs = _.merge( args.input.user, { email: email, customerId: customer.id, type: "editor" } )
//   const validatedUser = await validateUserInput( inputs )
//   const result = await CreateUser( validatedUser, req )
//   return result
// }
//
// async function createAdmin(root, args, req){
//   const email = await uniqueEmail( args.input.user.email )
//     .catch(err => { throw err })
//   const inputs = _.merge(args.input.user, { email: email, type: "admin" })
//   const validatedUser = await validateUserInput( inputs )
//   const result = await CreateUser( validatedUser, req )
//   return result
// }

// async function updateUser( root, args, req ){
//   const id = await mustHaveId(args.input.id)
//   if (args.input.stripeToken){
//     const customer = await CreateStripeCustomer( args.input.user )
//     args.input.user.customerId = customer.id
//   }
//   args.input.user.type = req.user.type
//   let validatedUser = await validateUserInput( args.input.user, true )
//   validatedUser.id = id
//   console.log(chalk.yellow.bold("++++ UpdateUser ++++++++++ Result"), validatedUser)
//   const result = await UpdateUser( validatedUser, req )
  // console.log(chalk.yellow.bold("++++ UpdateUser ++++++++++ Result"), result)
//   return { user: result }
// }

// async function destroyUser( root, args, req ){
//   const id = await mustHaveId(args.input.id)
//   const result = await DestroyUser( id, req )
//   return result
// }

// async function userProfile( root, args, req ){
  // const getUser = UserProfile(args.input.id)
  // const getCustomer = RetrieveCustomer(req.user.customerId)
  // const [user, customer] = await Promise.all([getUser, getCustomer])
  // const result =  _.merge(user.dataValues, customer)
  // console.log(chalk.yellow.bold("++++userProfile++++++++++ Result"), result)
  // return { user: result }
}

// module.exports = { createAgent, createPilot, createEditor, createAdmin, updateUser, destroyUser, userProfile }
