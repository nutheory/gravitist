import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} from 'graphql'
import UserType from './user_type'
import UsersService from '../../services/users'

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
      },
      resolve(parentValue, {id, email}, req) {
        return UsersService.getUserList({ id, email, req })
      }
    },
    users: {
      type: UserType,
      resolve(parentValue, args, req) {
        console.log("hello")
        const users = UsersService.getUserList()
        console.log("users", users)
        return UsersService.getUserList()
      }
    }
  }
})

module.exports = RootQueryType
