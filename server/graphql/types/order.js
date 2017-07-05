const Address from './address'
const User from './user'

const Order = `

  type Order {
    id: ID
    stripeInfo: String
    saveCard: Boolean
    plan: String
    status: String
    userId: String
    timeOfDay: String
  }

  input CreateOrderInput {
    stripeInfo: String
    saveCard: Boolean
    plan: String
    status: String
    address: CreateOrderAddressInput
    user: CreateOrderUserInput
  }

  type CreateOrderPayload {
    id: ID
    plan: String
    receiptId: String
    status: String
    address: CreateOrderAddressPayload
    user: CreateOrderUserPayload
  }
`

module.exports = [Order, Address, User]
