const User = `
  type User {
    id: ID
    name: String
    accountId: String
    email: String
    password: String
    type: String
    avatarId: ID
    bio: String
    workRadius: Int
    ratingCount: Int
    rating: String
    payRate: String
  }

  input LoginInput {
    email: String!
    password: String!
    type: String!
  }

  type LoginPayload {
    name: String
    email: String
    type: String
    token: String
  }

  input CreateOrderUserInput {
    name: String!
    email: String!
    password: String!
    type: String!
  }

  type CreateOrderUserPayload {
    name: String
    email: String!
    token: String!
  }
`

module.exports = User
