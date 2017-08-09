const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const resolvers = require('./resolvers')
const Order = require('./types/order')
const Address = require('./types/address')
const User = require('./types/user')
const Upload = require('./types/upload')
const Asset = require('./types/asset')

const Query = `
  type Query {
    agentOrders: [Order]
    agentOrder(id: ID): OrderPayload
    openMissions: [Order] 
    currentUser: User
  }
`

const Mutation = `
  type Mutation {
    login( input: LoginInput! ): LoginPayload
    logout: LogoutPayload
    createOrder( input: CreateOrderInput! ): OrderPayload
    fileUpload( input: AssetInput ): AssetPayload
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
    Asset,
    Upload,
    User
  ],
  resolvers
})

module.exports = schema
