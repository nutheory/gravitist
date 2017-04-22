const passport = require('passport')
const passportJWT = require('passport-jwt')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const config = require('../config')
const Db = require('../models')
const User = Db.sequelize.models.user

function getUserList() {
  const users = User.findAll({}).then((users) => {
    _.each(users, (user) => {
      console.dir(user.get())
    })

  })
  console.log("UsersService", users)
  return users
}


function getUser(token){
  passport.authenitcate()
}


module.exports = {getUserList, getUser}
