const Address = require('./address')
const User = require('./user')

const Order = `

  type Order {
    id: ID
    stripeInfo: String
    saveCard: Boolean
    plan: String
    status: String
    userId: String
    timeOfDay: String
    address: Address
    createdAt: String
    updatedAt: String
  }

  input AgentOrder {
    id: ID
  }

  input CreateOrderInput {
    stripeInfo: String
    saveCard: Boolean
    plan: String
    status: String
    address: CreateOrderAddressInput
    user: CreateOrderUserInput
  }

  type OrderPayload {
    id: ID
    plan: String
    receiptId: String
    status: String
    address: CreateOrderAddressPayload
    user: CreateOrderUserPayload
    createdAt: String
    updatedAt: String
  }

`

module.exports = [Order, Address, User]
