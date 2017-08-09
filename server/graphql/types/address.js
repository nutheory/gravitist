const Address = `

  type Address {
    id: ID,
    address1: String
    address2: String
    city: String
    state: String
    zipCode: String
    type: String
    lat: String
    lng: String
  }

  input CreateOrderAddressInput{
    orderId: ID
    address1: String!
    address2: String
    city: String
    state: String
    zipCode: String
    lat: String!
    lng: String!
  }

  type CreateOrderAddressPayload {
    id: ID
    address1: String
    address2: String
    city: String
    state: String
    zipCode: String
    type: String
    createdAt: String
    updatedAt: String
    lat: String
    lng: String
  }
`
module.exports = Address
