const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const GraphQLJSON = require('graphql-type-json')
const { companyResolvers } = require('./resolvers/companies')
const { userResolvers } = require('./resolvers/users')
const { listingResolvers } = require('./resolvers/listings')
const { noteResolvers } = require('./resolvers/notes')
const { orderResolvers } = require('./resolvers/orders')
const { paymentResolvers } = require('./resolvers/payments')
const Address = require('./types/address')
const Asset = require('./types/asset')
const Common = require('./types/common')
const Company = require('./types/company')
const Contact = require('./types/contact')
const Listing = require('./types/listing')
const Note = require('./types/note')
const Order = require('./types/order')
const Payment = require('./types/payment')
const Plan = require('./types/plan')
const Rating = require('./types/rating')
const User = require('./types/user')
const _ = require('lodash')

const Query = `
  type Query {
    currentUser : UserPayload
    tokenRefreshCheck : CheckTokenPayload
    getUsers( input: UserCollectionInput ): UsersPayload
    getOrders( input: OrderCollectionInput ): OrdersPayload
    getNotes( input: NotesCollectionInput ): NotesPayload
    getOrder( input: GetProtectedInput ): OrderPayload
    getMissions( input: GetListInput ): [Order]
    getUser( input: GetProtectedInput ): GetUserPayload
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
    createUser( input: UserInput ): UserTokenPayload
    createSource( input: CreateSourceInput ): CustomerPayload
    createListing( input: CreateListingInput ): ListingPayload
    createNote( input: CreateNoteInput ): NotePayload
    joinOrLeaveCollaboration( input: CollaborationInput ): OrderPayload
    createCompany( input: CompanyInput ): CompanyPayload
    joinCompany( input: JoinCompanyInput ): CompanyPayload
    leaveCompany( input: LeaveCompanyInput ): CompanyPayload
    updateOrder( input: UpdateOrderInput ): OrderPayload
    uploadedOrder( input: UploadedInput ): OrderPayload
    updateUser( input: UpdateUserInput ): UserTokenPayload
    verifyUser( input: VerifyUserInput ): UserVerifyPayload
    updateListing( input: UpdateListingInput ): ListingPayload
    updateCompany( input: UpdateCompanyInput ): CompanyPayload
    destroyUser( input: DestroyUserInput ): UserPayload
    destroySource( input: DestroySourceInput ): DestroySourcePayload
    destroyOrder( input: DestroyOrderInput ): OrderPayload
    destroyCompany( input: DestroyCompanyInput ): CompanyPayload
    destroyNote( input: DestroyNoteInput ): NotePayload
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
  {JSON: GraphQLJSON},
  companyResolvers,
  userResolvers,
  listingResolvers,
  noteResolvers,
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
    Listing,
    Note,
    Address,
    Asset,
    Order,
    Rating,
    User
  ],
  resolvers
})

module.exports = schema
