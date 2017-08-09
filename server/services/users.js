const Auth = require('./auth')
const _ = require('lodash')
const config = require('../config')
const Db = require('../models')
const UserDB = Db.sequelize.models.user
const stripe = require("stripe")(config.stripe.secret_key)

const uniqueEmail = async (email) => {
  const userCheck = await UserDB.findOne({ where: { email } }).then(existingUser => {
    if (existingUser) { return false }
  })
  return true
}

const CreateStripeCustomer = ({email, stripeToken}) => {
  return stripe.customers.create({
    email: email,
    description: 'Customer for ' + email,
    source: stripeToken
  })
}

const createAgent = async ({email, name, password}, stripeToken, req) => {
  if (email && name && password && uniqueEmail){
    const lowerEmail = email.toLowerCase()
    const customerId = await CreateStripeCustomer({lowerEmail, stripeToken})
    const user = await UserDB.create({ email: lowerEmail, password, name, type: 'agent', customerId: customerId.id })
    const logInUser = await Auth.login({email: lowerEmail, password, req})
    return new Promise((resolve, reject) => {
      const returnUser = {id: logInUser.id, name: logInUser.name, email: logInUser.email, customerId: customerId.id }
      logInUser ? resolve(returnUser) : reject('Something went wrong with creating a user, nothing will be billed.')
    })
  }
}

const createPilot = async ({email, name, password, }, req) => {
  if (email && name && password && uniqueEmail){
    const lowerEmail = email.toLowerCase()
    const customerId = await CreateStripeCustomer({lowerEmail, stripeToken})
    const user = await UserDB.create({ email: lowerEmail, password, name, type: 'agent', customerId: customerId.id })
    const logInUser = await Auth.login({email: lowerEmail, password, req})
    return new Promise((resolve, reject) => {
      const returnUser = {id: logInUser.id, name: logInUser.name, email: logInUser.email, customerId: customerId.id }
      logInUser ? resolve(returnUser) : reject('Something went wrong with creating a user, nothing will be billed.')
    })
  }
}


module.exports = { createAgent }
