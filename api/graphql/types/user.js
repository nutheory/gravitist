const User = `
  type User {
    id: ID
    name: String
    accountId: String
    customerId: String
    stripeToken: String
    email: String
    password: String
    type: String
    bio: String
    isVerified: Boolean
    refreshToken: Boolean
    termsAccepted: Boolean
    deactivated: Boolean
    unsubscribedEmail: Boolean
    workRadius: Int
    ratingCount: Int
    abortCount: Int
    rating: String
    payRate: String
    address: Address
    avatar: Asset
    avatars: [Asset]
    licenses: [Asset]
    insurances: [Asset]
    contacts: [Contact]
    bailedMissions: [BailedMissions]
    createdAt: String
    updatedAt: String
  }

  type AuthPayload {
    token: String
  }

  input UpdateUserInput {
    id: ID
    authorizedId: ID
    user: UpdateUserInputFields
  }

  input DeactivateUserInput {
    id: ID
    authorizedId: ID
    deactivatedReason: String
  }

  input UpdateUserInputFields {
    name: String
    email: String
    password: String
    bio: String
    stripeToken: String
    isVerified: Boolean
    refreshToken: Boolean
    termsAccepted: Boolean
    unsubscribedEmail: Boolean
    workRadius: Int
    ratingCount: Int
    rating: String
    payRate: String
    address: AddressInput
    contacts: [ContactInput]
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input InitResetPasswordInput {
    email: String!
  }

  input ResetPasswordInput {
    email: String!
    password: String!
  }

  input DestroyUserInput {
    id: ID!
    authorizedId: ID!
  }

  type LogoutPayload {
    id: ID
    email: String
  }

  input AgentInput{
    user: AgentInputFields
  }

  input PilotInput{
    user: PilotInputFields
  }

  input UserCollectionInput{
    options: GetListInput
    criteria: UserInputFields
    queryString: String
  }

  input UserInput{
    user: UserInputFields
  }

  input VerifyUserInput{
    id: ID
    authorizedId: ID
    user: VerifyUserInputFields
  }

  input VerifyUserInputFields{
    isVerified: Boolean
    refreshToken: Boolean
  }

  input AgentInputFields {
    name: String
    email: String
    password: String
    stripeToken: String
    bio: String
    address: AddressInput
    contacts: [ContactInput]
  }

  input PilotInputFields {
    name: String
    email: String
    password: String
    stripeToken: String
    workRadius: Int
    bio: String
    address: AddressInput
    contacts: [ContactInput]
  }

  input UserInputFields {
    name: String
    email: String
    password: String
    type: String
    bio: String
    isVerified: Boolean
    address: AddressInput
    contacts: [ContactInput]
  }

  type CheckTokenPayload {
    user: CheckPayloadFields
  }

  type CheckPayloadFields {
    refreshToken: Boolean
  }

  type UsersPayload {
    count: Int
    users: [User]
  }

  type BailedMissions{
    userId: ID
    orderId: ID
    createdAt: String
  }

  type UserPayload {
    user: UserPayloadFields
  }

  type UserVerifyPayload {
    user: UserVerifyPayloadFields
  }

  type UserVerifyPayloadFields{
    id: ID
    isVerified: Boolean
  }

  type UserTokenPayload {
    user: UserPayloadFields
    auth: AuthPayload
  }

  type GetUserPayload {
    user: User
  }

  type GetUserFields {
    id: ID
    name: String
    email: String
    abortCount: Int
    customerId: String
    companyId: ID
    companyOwner: Boolean
    contacts: [Contact]
    address: AddressPayloadFields
    type: String
  }

  type UserPayloadFields {
    id: ID
    name: String
    email: String
    customerId: String
    accountId: String
    companyId: ID
    companyOwner: Boolean
    deactivated: Boolean
    abortCount: Int
    bio: String
    address: AddressPayloadFields
    isVerified: Boolean
    refreshToken: Boolean
    termsAccepted: Boolean
    unsubscribedEmail: Boolean
    workRadius: Int
    insurance: AssetPayload
    license: AssetPayload
    avatar: AssetPayload
    type: String
    contacts: [Contact]
    bailedMissions: [BailedMissions]
  }
`

module.exports = User
