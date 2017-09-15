const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const resolvers = require('./resolvers')
const Address = require('./types/address')
const User = require('./types/user')
const Plan = require('./types/plan')
const Order = require('./types/order')
// const Upload = require('./types/upload')
// const Asset = require('./types/asset')

const Query = `
  type Query {
    agentOrders: [Order]
    agentOrder(id: ID): OrderPayload
    missions: [Order]
    userProfile(id: ID): UserPayload
  }
`

const Mutation = `
  type Mutation {
    login( input: LoginInput! ): UserTokenPayload
    createOrderWithUser( input: OrderWithUserInput ): OrderTokenPayload
    createOrder( input: OrderInput ): OrderPayload
    createAgent( input: AgentInput ): UserTokenPayload
    createPilot( input: PilotInput ): UserTokenPayload
    createEditor( input: EditorInput ): UserTokenPayload
    createAdmin( input: AdminInput ): UserTokenPayload
    updateUser( input: UpdateUserInput ): UserPayloadFields
    destroyUser( input: DestroyUserInput ): UserPayloadFields
    destroyOrder( input: DestroyOrderInput ): OrderPayloadFields
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
    Plan,
    Address,
    ...Order,
    User
  ],
  resolvers
})

module.exports = schema
