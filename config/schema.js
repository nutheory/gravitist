import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'

const UserType = new GraphQLObjectType({
  name: 'User',
  description: '...',

  fields: ({
    user: {
      type: UserType,
      args: {
        id: {type: GraphQLString}
      },
      resolve: () => {

      }
    }
  })
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: '...',

  fields: ({
    user: {
      type: UserType,
      args: {
        id: {type: GraphQLString}
      },
      resolve: () => {

      }
    }
  })
})
