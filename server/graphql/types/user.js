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
    type: String
  }

  type LoginPayload {
    id: ID
    name: String
    email: String
    type: String
  }

  input LogoutInput {
    email: String
  }

  type LogoutPayload {
    email: String
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
  }
`

module.exports = User
