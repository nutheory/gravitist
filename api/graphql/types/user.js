const User = `
  type User {
    id: ID
    name: String
    customerId: String
    stripeToken: String
    email: String
    password: String
    type: String
    bio: String
    isVerified: Boolean
    workRadius: Int
    ratingCount: Int
    rating: String
    payRate: String
    address: Address
    contacts: [Contact]
  }

  type AuthPayload {
    token: String
  }

  input UpdateUserInput {
    id: ID
    authorizedId: ID
    user: UpdateUserInputFields
  }

  input UpdateUserInputFields {
    name: String
    password: String
    bio: String
    stripeToken: String
    isVerified: Boolean
    workRadius: Int
    ratingCount: Int
    rating: String
    payRate: String
    address: AddressInput
    avatar: AssetInput
    license: AssetInput
    insurance: AssetInput
    contacts: [ContactInput]
  }

  input LoginInput {
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
    avatar: AssetInput
    license: AssetInput
    insurance: AssetInput
    contacts: [ContactInput]
  }

  input EditorInputFields {
    name: String
    email: String
    password: String
    stripeToken: String
    bio: String
    address: AddressInput
    avatar: AssetInput
    contacts: [ContactInput]
  }

  input AdminInputFields {
    name: String
    email: String
    password: String
    bio: String
    address: AddressInput
    avatar: AssetInput
    contacts: [ContactInput]
  }

  type UserPayload {
    user: UserPayloadFields
  }

  type UserTokenPayload {
    user: UserPayloadFields
    auth: AuthPayload
  }

  type GetProfilePayload {
    user: UserPayloadFields
  }

  type GetProfileFields {
    id: ID
    name: String
    email: String
    customerId: String
    companyId: ID
    companyOwner: Boolean
    address: AddressPayloadFields
    type: String
  }

  type UserPayloadFields {
    id: ID
    name: String
    email: String
    customerId: String
    companyId: ID
    companyOwner: Boolean
    address: AddressPayloadFields
    insurance: AssetPayload
    license: AssetPayload
    avatar: AssetPayload
    type: String
    contacts: [Contact]
  }
`

module.exports = User
