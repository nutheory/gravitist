const Auth = require('./auth')
const _ = require('lodash')
const config = require('../config')
const Db = require('../models')
const UserDB = Db.sequelize.models.user
const stripe = require("stripe")(config.stripe.secret_key)

const createAgent = async ({email, name, password, type}, stripeToken, req) => {
  if (!email || !name || !password || !type){
    throw new Error('Please provide required info.') }
  const userCheck = await UserDB.findOne({ where: { email } }).then(existingUser => {
    if (existingUser) { throw new Error('Email in use') }
  })

  const customerId = await stripe.customers.create({
    email: email,
    description: 'Customer for ' + email,
    source: stripeToken
  })

  const lowerEmail = email.toLowerCase()
  const user = await UserDB.create({ email: lowerEmail, password, name, type, customerId: customerId.id })
  const logInUser = await Auth.login({email: lowerEmail, password, req})
  return new Promise((resolve, reject) => {
    const returnUser = {id: logInUser.id, name: logInUser.name, email: logInUser.email, customerId: customerId.id }
    console.log('returnUser', returnUser)
    resolve(returnUser)
  })
}

  // getUserList() {
  //   const users = UserDB.findAll({}).then((users) => {
  //     _.each(users, (user) => {
  //       console.dir(user.get())
  //     })
  //
  //   })
  //   console.log("UsersService", users)
  //   return users
  // }
  //
  // getUser(){
  //   passport.authenitcate()
  // }


module.exports = { createAgent }
