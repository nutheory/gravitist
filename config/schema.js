import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql'
import Db from '../models/index'


const AddressType = new GraphQLObjectType({
  name: 'Address',
  description: '...',

  fields: ({
    id: {
      type: GraphQLInt,
      resolve(address) { return address.id }
    },
    streetOne: {
      type: GraphQLString,
      resolve(address) { return address.streetOne }
    },
    streetTwo: {
      type: GraphQLString,
      resolve(address) { return address.streetTwo }
    },
    city: {
      type: GraphQLString,
      resolve(address) { return address.city }
    },
    state: {
      type: GraphQLString,
      resolve(address) { return address.state }
    },
    zip: {
      type: GraphQLString,
      resolve(address) { return address.zip }
    },
    type: {
      type: GraphQLString,
      resolve(address) { return address.type }
    },
    latlng: {
      type: GraphQLString,
      resolve(address) { return address.latlng }
    },
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  description: '...',

  fields: ({
    id: {
      type: GraphQLInt,
      resolve(user) { return user.id }
    },
    customerId: {
      type: GraphQLString,
      resolve(user) { return user.externalId }
    },
    address: {
      type: GraphQLString,

    },
    name: {
      type: GraphQLString,
      resolve(user) { return user.name }
    },
    phoneNumber: {
      type: GraphQLString,
      resolve(user) { return user.phoneNumber }
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
    avatar: {
      type: GraphQLString,
      resolve(user) { return user.avatar }
    },
    bio: {
      type: GraphQLString,
      resolve(user) { return user.bio }
    },
    company: {
      type: GraphQLString,
      resolve(user) { return user.company }
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

  })
})


const OrderType = new GraphQLObjectType({
  name: 'Address',
  description: '...',

  fields:({
    aviatorId: {type: GraphQLString},
    addressId: {type: GraphQLString},
    receiptId: {type: GraphQLString},
    status: {type: GraphQLString},
    userId: {type: GraphQLString},
    timeOfDay: {type: GraphQLString},
    resolve() {

    }
  })
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: '...',

  fields: ({
    address: {
      type: AddressType,
      args: {
        id: {
          description: "id of the address",
          type: new GraphQLNonNull(GraphQLString)
        }
      },
    },
    users: {
      type: new GraphQLList(UserType),
      args: {
        id: { type: GraphQLInt },
        email: { type: GraphQLString }
      },
      resolve(users) {
        // Db.models.user.findAll(where: args)
        console.log("DB", Db.models.user)
      }
    }
  })
})

export default new GraphQLSchema({
  query: QueryType,
})
