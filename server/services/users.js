const Auth = require('./auth')
const _ = require('lodash')
const config = require('../config')
const Db = require('../models')
const UserDB = Db.sequelize.models.user
const auth = new Auth
const stripe = require("stripe")(config.stripe.secret_key)

class User {

  static async createAgent({email, name, password, type}, stripeToken, req){
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
    const user = await UserDB.create({ email: lowerEmail, password, name, type, accountId: customerId.id })
    const logInUser = await auth.login({email: lowerEmail, password, req})
    console.log('logInUser token', logInUser.token)
    return new Promise((resolve, reject) => {
      const returnUser = {id: logInUser.id, name: logInUser.name, email: logInUser.email,
        token: logInUser.token, accountId: customerId.id }
      resolve(returnUser)
    })
  }

  //   return User.create({ email, password, name, type })
  // }).then(user => {
  //   return new Promise((resolve, reject) => {
  //     login(user, { session: false }, (err) => {
  //       if (err) { reject(err) }
  //       resolve(user)
  //     })
  //   })




  getUserList() {
    const users = UserDB.findAll({}).then((users) => {
      _.each(users, (user) => {
        console.dir(user.get())
      })

    })
    console.log("UsersService", users)
    return users
  }


  getUser(token){
    passport.authenitcate()
  }

}

module.exports = User
