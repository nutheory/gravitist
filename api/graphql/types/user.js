const User = `
  type User {
    id: ID
    name: String
    customerId: String
    stripeInfo: String
    email: String
    password: String
    type: String
    avatarId: ID
    bio: String
    isVerified: Boolean
    licenseId: ID
    insuranceId: ID
    workRadius: Int
    ratingCount: Int
    rating: String
    payRate: String
    address: Address
  }

  type AuthPayload {
    token: String
  }

  input UpdateUserInput {
    id: ID
    name: String
    email: String
    password: String
    avatarId: ID
    bio: String
    stripeInfo: String
    isVerified: Boolean
    licenseId: Int
    insuranceId: Int
    workRadius: Int
    ratingCount: Int
    rating: String
    payRate: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input DestroyUserInput {
    itemId: ID!
    ownerId: ID!
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

  input EditorInput{
    user: EditorInputFields
  }

  input AdminInput{
    user: AdminInputFields
  }

  input AgentInputFields {
    name: String
    email: String
    password: String
    stripeInfo: String
    bio: String
    avatarId: ID
  }

  input PilotInputFields {
    name: String
    email: String
    password: String
    stripeInfo: String
    licenseId: ID
    insuranceId: ID
    workRadius: Int
    address: AddressInputFields
    bio: String
    avatarId: ID
  }

  input EditorInputFields {
    name: String
    email: String
    password: String
    stripeInfo: String
    bio: String
    avatarId: ID
  }

  input AdminInputFields {
    name: String
    email: String
    password: String
    bio: String
    avatarId: ID
  }

  type UserPayload {
    user: UserPayloadFields
  }

  type UserTokenPayload {
    user: UserPayloadFields
    auth: AuthPayload
  }

  type UserPayloadFields {
    id: ID
    name: String
    email: String
    customerId: String
    address: AddressPayloadFields
    type: String
  }
`

module.exports = User
