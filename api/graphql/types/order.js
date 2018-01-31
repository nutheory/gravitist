const Order = `
  type Order {
    id: ID
    plan: String
    status: String
    receiptId: String
    pilotId: ID
    agentId: ID
    editorId: ID
    pilotAcceptedAt: String
    editorAcceptedAt: String
    agentAcceptedAt: String
    pilotBounty: String
    pilotDistance: String
    pilotTransferId: String
    uploadedAt: String
    agent: User
    pilot: User
    editor: User
    notes: [Note]
    assets: [Asset]
    address: Address
    createdAt: String
    updatedAt: String
    distanceFromLocation: String
  }

  input AgentOrder {
    id: ID
  }

  input OrderCollectionInput{
    options: GetListInput
    criteria: OrderInputFields
    queryString: String
  }

  input OrderWithUserInput {
    user: AgentInputFields
    order: OrderInputFields
  }

  input UpdateOrderInput {
    id: ID!
    authorizedId: ID!
    order: OrderInputFields
    address: AddressInput
  }

  input OrderInput {
    order: OrderInputFields
  }

  input OrderInputFields {
    status: String
    plan: PlanInput
    pilotId: ID
    agentId: ID
    editorId: ID
    address: AddressInput
  }

  input UploadedInput {
    id: ID
    authorizedId: ID
    status: String
    uploadedAt: String
    rawUrl: String
  }

  input CollaborationInput {
    id: ID
    authorizedId: ID
    status: String
    pilotBounty: String
    pilotDistance: String
    pilotId: ID
    pilotAcceptedAt: String
  }

  input DestroyOrderInput {
    id: ID!
    authorizedId: ID!
  }

  type OrdersPayload {
    orders: [Order]
  }

  type OrderPayload {
    order: OrderPayloadFields
    auth: AuthPayload
  }

  type OrderPayloadFields {
    id: ID
    plan: String
    agentId: ID
    receiptId: String
    pilotAcceptedAt: String
    editorAcceptedAt: String
    agentAcceptedAt: String
    pilotBounty: String
    pilotDistance: String
    pilotTransferId: String
    status: String
    uploadedAt: String
    address: Address
    notes: [Note]
    listing: Listing
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
