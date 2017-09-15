const Address = require('./address')
const User = require('./user')
const Plan = require('./plan')

const Order = `
  type Order {
    id: ID
    plan: String
    status: String
    agentId: String
    receiptId: String
    timeOfDay: String
    planInfo: Plan
    address: Address
    acceptedAt: String
    createdAt: String
    updatedAt: String
    distanceFromLocation: String
  }

  input AgentOrder {
    id: ID
  }

  input OrderWithUserInput {
    order: OrderWithUserInputFields
  }

  input OrderWithUserInputFields {
    planInfo: PlanInputFields
    address: AddressInputFields
    user: AgentInputFields
  }

  input OrderInput {
    order: OrderInputFields
  }

  input OrderInputFields {
    planInfo: PlanInputFields
    address: AddressInputFields
  }

  input DestroyOrderInput {
    itemId: ID!
    ownerId: ID!
  }

  type OrderPayload {
    order: OrderPayloadFields
    auth: AuthPayload
  }

  type OrderTokenPayload {
    order: OrderPayloadFields
    auth: AuthPayload
  }

  type OrderPayloadFields {
    id: ID
    plan: String
    receiptId: String
    status: String
    address: Address
    agent: User
    distanceFromLocation: String
  }
`

module.exports = [Order, Address, User, Plan]
