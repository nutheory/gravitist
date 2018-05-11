const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const GraphQLJSON = require('graphql-type-json')
const { companyResolvers } = require('./resolvers/companies')
const { userResolvers } = require('./resolvers/users')
const { assetResolvers } = require('./resolvers/assets')
const { listingResolvers } = require('./resolvers/listings')
const { discountResolvers } = require('./resolvers/discounts')
const { failedMissionResolvers } = require('./resolvers/failed_missions')
const { contactResolvers } = require('./resolvers/contacts')
const { noteResolvers } = require('./resolvers/notes')
const { orderResolvers } = require('./resolvers/orders')
const { paymentResolvers } = require('./resolvers/payments')
const Address = require('./types/address')
const Asset = require('./types/asset')
const Common = require('./types/common')
const Company = require('./types/company')
const Contact = require('./types/contact')
const Discount = require('./types/discount')
const FailedMission = require('./types/failed_mission')
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
    getNotes( input: NoteCollectionInput ): NotesPayload
    getAssets( input: AssetCollectionInput ): AssetsPayload
    getOrder( input: GetProtectedInput ): OrderPayload
    getMissions( input: GetListInput ): [Order]
    getFailedMissions( input: GetFailedMissionsInput ): FailedMissionPayload
    getUser( input: GetProtectedInput ): GetUserPayload
    getCustomer( input: GetCustomerInput ): CustomerPayload
    getGallery( input: GetGalleryInput ): GalleryPayload
    applyDiscount( input: ApplyDiscountInput ): DiscountPayload
    getDiscounts( input: DiscountCollectionInput ): DiscountsPayload
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
    deactivateUser( input: DeactivateUserInput ): UserTokenPayload
    createSource( input: CreateSourceInput ): CustomerPayload
    createListing( input: CreateListingInput ): ListingPayload
    createNote( input: CreateNoteInput ): NotePayload
    createLead( input: CreateLeadInput ): LeadPayload
    createDiscount( input: CreateDiscountInput ): DiscountPayload
    joinPilot( input: JoinPilotInput ): OrderPayload
    bailPilot( input: BailPilotInput ): OrderPayload
    approveOrder( input: UpdateOrderInput ): OrderPayload
    rejectOrder( input: UpdateOrderInput ): OrderPayload
    createCompany( input: CompanyInput ): CompanyPayload
    joinCompany( input: JoinCompanyInput ): CompanyPayload
    leaveCompany( input: LeaveCompanyInput ): CompanyPayload
    updateOrder( input: UpdateOrderInput ): OrderPayload
    uploadedOrder( input: UploadedInput ): OrderPayload
    updateUser( input: UpdateUserInput ): UserTokenPayload
    updateAsset( input: AssetInput ): AssetPayload
    verifyUser( input: VerifyUserInput ): UserVerifyPayload
    updateListing( input: UpdateListingInput ): ListingPayload
    updateCompany( input: UpdateCompanyInput ): CompanyPayload
    destroyUser( input: DestroyUserInput ): UserPayload
    destroySource( input: DestroySourceInput ): DestroySourcePayload
    destroyOrder( input: DestroyOrderInput ): OrderPayload
    destroyCompany( input: DestroyCompanyInput ): CompanyPayload
    destroyDiscount( input: DestroyDiscountInput ): DiscountPayload
    destroyNote( input: DestroyNoteInput ): NotePayload
    destroyAsset( input: AssetInput ): AssetPayload
    setDefaultSource( input: SetDefaultSourceInput ): CustomerPayload
    toggleDefaultAsset( input: AssetInput ): AssetPayload
    initResetPassword( input: InitResetPasswordInput ): UserPayload
    resetPassword( input: ResetPasswordInput ): UserTokenPayload
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
  assetResolvers,
  listingResolvers,
  discountResolvers,
  failedMissionResolvers,
  contactResolvers,
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
    Discount,
    FailedMission,
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
