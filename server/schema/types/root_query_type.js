const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} = require('graphql')
const UserType = require('./user_type')
const UsersService = require('../../services/users')

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
