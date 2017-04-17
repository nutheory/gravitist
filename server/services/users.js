const passport = require('passport')
const passportJWT = require('passport-jwt')
const jwt = require('jsonwebtoken')
const config = require('../config')
const Db = require('../models')
const User = Db.sequelize.models.user

function getUserList() {
  const users = User.findAll({}).then((users) => {
    console.log("promise", users.data)
  })
  console.log("UsersService", users)
  return users
}

function getUser(id){

}


module.exports = {getUserList, getUser}
