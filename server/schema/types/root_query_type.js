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
    current_user: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(parentValue, {token}, req) {
        console.log('req', req)
        return UsersService.getUser({ token, req })
      }
    },
    users: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        email: { type: GraphQLString },
      },
      resolve(parentValue, args, req) {
        console.log("hello")
        const users = UsersService.getUserList({ id, email, req })

        console.log("users", users)
        return UsersService.getUserList()
      }
    }
  }
})

module.exports = RootQueryType
