const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql')
const Db = require('../models')
const UserType = require('./types/user_type')
const AuthService = require('../services/auth')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        type: { type: GraphQLString }
      },
      resolve(parentValue, { email, password, name, type }, req) {
        return AuthService.signup({ email, password, name, type, req })
      }
    },
  //   signup: {
  //     type: UserType,
  //     args: {
  //       name: { type: GraphQLString },
  //       email: { type: GraphQLString },
  //       password: { type: GraphQLString },
  //       type: { type: GraphQLString }
  //     },
  //     resolve(parentValue, { email, password, name, type }, req) {
  //       return AuthService.signup({ email, password, name, type, req })
  //     }
  //   },
  //   login: {
  //     type: UserType,
  //     args: {
  //       email: { type: GraphQLString },
  //       password: { type: GraphQLString }
  //     },
  //     resolve(parentValue, { email, password }, req) {
  //       // let boo = AuthService.login({ email, password, req })
  //       // console.log("boo", AuthService.login({ email, password, req }))
  //       return AuthService.login({ email, password, req })
  //     }
  //   },
  //   logout: {
  //     type: UserType,
  //     resolve(parentValue, args, req) {
  //       const { user } = req
  //       req.logout()
  //       return user
  //     }
  //   }
  }
})

module.exports = mutation
