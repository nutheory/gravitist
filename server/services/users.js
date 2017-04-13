import passport from 'passport'
import passportJWT from 'passport-jwt'
import jwt from 'jsonwebtoken'
import config from '../config'
import Db from '../models'
const User = Db.sequelize.models.user

function getUserList() {
  const users = User.findAll({}).then((users) => {
    console.log("prom", users.data)
  })
  console.log("UsersService", users)
  return users
}

function getUser(id){

}


module.exports = {getUserList, getUser}
