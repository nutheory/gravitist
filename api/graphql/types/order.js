const Order = `
  type Order {
    id: ID
    plan: String
    status: String
    pilotId: ID
    agentId: ID
    editorId: ID
    pilotAcceptedAt: String
    editorAcceptedAt: String
    agentAcceptedAt: String
    agent: User
    pilot: User
    editor: User
    receiptId: String
    timeOfDay: String
    address: Address
    createdAt: String
    updatedAt: String
    distanceFromLocation: Float
  }

  input AgentOrder {
    id: ID
  }

  input OrderWithUserInput {
    user: AgentInputFields
    order: OrderInputFields
  }

  input UpdateOrderInput {
    id: ID!
    authorizedId: ID!
    order: OrderInputFields
  }

  input OrderInput {
    order: OrderInputFields
  }

  input OrderInputFields {
    status: String
    plan: PlanInput
    address: AddressInput
  }

  input CollaborationInput {
    id: ID
    authorizedId: ID
    status: String
  }

  input DestroyOrderInput {
    id: ID!
    authorizedId: ID!
  }

  type OrderPayload {
    order: OrderPayloadFields
    auth: AuthPayload
  }

  type OrderPayloadFields {
    id: ID
    plan: String
    receiptId: String
    pilotAcceptedAt: String
    editorAcceptedAt: String
    agentAcceptedAt: String
    status: String
    address: Address
    agent: User
    pilot: User
    editor: User
    assets: [Asset]
    distanceFromLocation: Float
    createdAt: String
    updatedAt: String
  }
`

module.exports = Order
