const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const resolvers = require('./resolvers')
const Order = require('./types/order')
const Address = require('./types/address')
const User = require('./types/user')

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
