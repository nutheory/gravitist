import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql'
import Db from '../../models/index'

const UserType = new GraphQLObjectType({
  name: 'User',
  description: '...',

  fields: ({
    id: {
      type: GraphQLInt,
      resolve(user) { return user.id }
    },
    accountId: {
      type: GraphQLString,
      resolve(user) { return user.externalId }
    },
    name: {
      type: GraphQLString,
      resolve(user) { return user.name }
    },
    email: {
      type: GraphQLString,
      resolve(user) { return user.email }
    },
    password: {
      type: GraphQLString,
      resolve(user) { return user.password }
    },
    type: {
      type: GraphQLString,
      resolve(user) { return user.type }
    },
    avatarId: {
      type: GraphQLInt,
      resolve(user) { return user.avatar }
    },
    bio: {
      type: GraphQLString,
      resolve(user) { return user.bio }
    },
    workRadius: {
      type: GraphQLString,
      resolve(user) { return user.workRadius }
    },
    ratingCount: {
      type: GraphQLString,
      resolve(user) { return user.ratingCount }
    },
    rating: {
      type: GraphQLString,
      resolve(user) { return user.rating }
    },
    payRate: {
      type: GraphQLString,
      resolve(user) { return user.payRate }
    },
    createdAt: {
      type: GraphQLString,
      resolve(user) { return user.createdAt }
    },
    updatedAt: {
      type: GraphQLString,
      resolve(user) { return user.updatedAt }
    },
    token: {
      type: GraphQLString,
      resolve(user) { return user.token }
    }
  })
})

export default UserType
