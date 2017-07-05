const Address = `

  type Address {
    id: ID,
    address1: String
    address2: String
    city: String
    state: String
    zip: String
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
    zip: String
    lat: String!
    lng: String!
  }

  type CreateOrderAddressPayload {
    id: ID
    address1: String
    address2: String
    city: String
    state: String
    zip: String
  }
`
module.exports = Address
