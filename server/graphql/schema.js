import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import resolvers from './resolvers'
import Order from './types/order'
import Address from './types/address'
import User from './types/user'

const Query = `
  type Query {
    orders: [Order]
    user: User
  }
`

const Mutation = `
  type Mutation {
    login( input: LoginInput! ): LoginPayload
    createOrder( input: CreateOrderInput! ): CreateOrderPayload
  }
`

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`

const schema = makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    Query,
    Mutation,
    ...Order,
    Address,
    User
  ],
  resolvers
})

module.exports = schema
