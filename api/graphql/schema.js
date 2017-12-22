const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const { companyResolvers } = require('./resolvers/companies')
const { userResolvers } = require('./resolvers/users')
const { orderResolvers } = require('./resolvers/orders')
const { paymentResolvers } = require('./resolvers/payments')
const Address = require('./types/address')
const Asset = require('./types/asset')
const Common = require('./types/common')
const Company = require('./types/company')
const Contact = require('./types/contact')
const Order = require('./types/order')
const Payment = require('./types/payment')
const Plan = require('./types/plan')
const Rating = require('./types/rating')
const User = require('./types/user')
const _ = require('lodash')

const Query = `
  type Query {
    currentUser : UserPayload
    getOrders( input: GetListInput ): [Order]
    getOrder( input: GetProtectedInput ): OrderPayload
    getMissions( input: GetListInput ): [Order]
    getProfile( input: GetProtectedInput ): GetProfilePayload
    getCustomer( input: GetCustomerInput ): CustomerPayload
  }
`

const Mutation = `
  type Mutation {
    loginUser( input: LoginInput! ): UserTokenPayload
    createOrderWithUser( input: OrderWithUserInput ): OrderPayload
    createOrder( input: OrderInput ): OrderPayload
    createAgent( input: AgentInput ): UserTokenPayload
    createPilot( input: PilotInput ): UserTokenPayload
    createEditor( input: EditorInput ): UserTokenPayload
    createAdmin( input: AdminInput ): UserTokenPayload
    createSource( input: CreateSourceInput ): CustomerPayload
    joinOrLeaveCollaboration( input: CollaborationInput ): OrderPayload
    createCompany( input: CompanyInput ): CompanyPayload
    joinCompany( input: JoinCompanyInput ): CompanyPayload
    leaveCompany( input: LeaveCompanyInput ): CompanyPayload
    updateOrder( input: UpdateOrderInput ): OrderPayload
    updateUser( input: UpdateUserInput ): UserPayload
    updateCompany( input: UpdateCompanyInput ): CompanyPayload
    destroyUser( input: DestroyUserInput ): UserPayload
    destroySource( input: DestroySourceInput ): DestroySourcePayload
    destroyOrder( input: DestroyOrderInput ): OrderPayload
    destroyCompany( input: DestroyCompanyInput ): CompanyPayload
    setDefaultSource( input: SetDefaultSourceInput ): CustomerPayload
  }
`

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`

const resolvers = _.merge(
  companyResolvers,
  userResolvers,
  orderResolvers,
  paymentResolvers
)

const schema = makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    Query,
    Mutation,
    Payment,
    Plan,
    Common,
    Company,
    Contact,
    Address,
    Asset,
    Order,
    Rating,
    User
  ],
  resolvers
})

module.exports = schema
