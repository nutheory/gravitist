const _ = require('lodash')
const config = require('../config')
const Db = require('../models')
const User = Db.sequelize.models.user
const Address = Db.sequelize.models.address
const { login } = require('./auth')
const stripe = require("stripe")(config.stripe_test.secret_key)
const AppError = require('../utils/appErrors').createAppError
const chalk = require('chalk')

async function CreateUser(userAttributes, req){
  const includeAssociated = userAttributes.address ? { include: [ Address ] } : {}
  const user = await User.create( userAttributes, includeAssociated )
    .catch(err => { throw( AppError( { type: `User.Create`, message: `${err}` } ) ) })
  const loginResponse = await login({ email: userAttributes.email, password: userAttributes.password }, req)
  return new Promise((resolve, reject) => {
    loginResponse ? resolve(loginResponse) : reject('Something went wrong with creating a agent, nothing will be billed.')
  })
}

async function UpdateUser( userAttributes, req ){
  if ( !isAdmin || req.user.id != userAttributes.id ){
    throw( AppError( {
      type: `User.Auth`,
      message: `You cannot update ${req.user.type} ${req.user.name}.`
    } ) )
  }
  console.log("UPDATES-BE ======= ", userAttributes)
  let updates = [Object.keys(userAttributes).forEach((key) =>
    (userAttributes[key] == null) && delete userAttributes[key]), userAttributes][1]
  console.log("UPDATES-AF ======= ", updates)
  const fields = ['password', 'bio', 'avatarId', 'name', 'address', 'payrate', 'workRadius', 'licenseId', 'insuranceId', 'customerId']
  const user = await User.findById( userAttributes.id )
  const updatedUser = await user.update(updates, { fields: fields, req } )
  return updatedUser
}

async function DestroyUser( userId, req ){
  if ( !isAdmin || !req.user.id == parseInt(userId) ){
    throw( AppError( {
      type: `User.Destroy`,
      message: `You cannot delete ${req.user.type} ${req.user.name}.`
    } ) )
  }
  const result = await User.findById( userId ).then(res => {
    const user = res
    res.destroy().catch(err => {
      throw( AppError( {
        type: `User.Destroy`,
        message: `${err}`,
        detail: `Input: { userId: ${userId}, req: ${req} }`
      } ) )
    })
    return user
  })

  return result
}

async function uniqueEmail(email){
  const lowercaseEmail = email.toLowerCase()
  const existingUser = await User.findOne({ where: { email: lowercaseEmail } }).then(res => { return res })
  if (existingUser) {
    throw AppError( { type: `User.NotUnique`, message: `${existingUser.email} is taken, Please login instead.` } )
  }
  return lowercaseEmail
}

const createStripeCustomer = (customerInput) => {
  const result = stripe.customers.create({
    email: customerInput.email,
    description: `Customer for ${customerInput.email}`,
    source: customerInput.stripeInfo
  }).then((res) => {
    return res
  })
  return result
}

function validateUserInput(input){
  let expectedKeys, acceptedKeys = []
  let output = {}
  switch(input.type){
    case "agent":
      expectedKeys = !input.id ? [ "email", "name", "password", "customerId" ] : []
      acceptedKeys = [ "email", "name", "password", "customerId", "bio", "avatarId", "address", "contacts" ]
      break
    case "pilot":
      expectedKeys = [ "licenseId", "insuranceId", "email", "name", "password", "address", "workRadius", "customerId" ]
      acceptedKeys = [ "licenseId", "insuranceId", "email", "name", "password", "address", "workRadius", "customerId",
        "bio", "avatarId", "contacts", "isVerified", "payRate" ]
      break
    case "editor":
      expectedKeys = [ "email", "name", "password", "customerId" ]
      acceptedKeys = [ "email", "name", "password", "customerId", "bio", "avatarId", "contacts", "isVerified", "payRate" ]
      break
    case "admin":
      expectedKeys = [ "email", "name", "password" ]
      acceptedKeys = [ "email", "name", "password", "bio", "avatarId", "contacts" ]
      break
  }

  try{
    _.forIn(expectedKeys, (key, idx) => {
      if (!input[key]){
        throw( AppError( {
          type: `User.Create`,
          message: `Missing required field ${key}.`,
          detail: `Input....
                  ${input}`
        } ) )
      }
    })
    _.forIn(acceptedKeys, (key, idx) => {
      output[key] = input[key]
    })
  }
  catch(e){
    return e
  }
  output.type = input.type
  return output
}

const isAdmin = (req) => {
  req.user.type == "admin"
}

const getUserWith = ( user, withAttr = [] ) => {
  return User.findOne({ where: { id: currentUser.id }, include: withAttr })
    .then(( res ) => { return res })
}

async function UserProfile(id){
 const user = await User.findOne({ where: { id: id }, include: [Address] })
 return user
}

module.exports = { CreateUser, UpdateUser, DestroyUser, UserProfile, uniqueEmail,
                   createStripeCustomer, validateUserInput, getUserWith }
