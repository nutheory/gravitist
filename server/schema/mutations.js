import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql'
import Db from '../models'
import UserType from './types/user_type'
import AuthService from '../services/auth'

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
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
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        // let boo = AuthService.login({ email, password, req })
        // console.log("boo", AuthService.login({ email, password, req }))
        return AuthService.login({ email, password, req })
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req
        req.logout()
        return user
      }
    }
  }
})

export default mutation
