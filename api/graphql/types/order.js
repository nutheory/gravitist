const Order = `
  type Order {
    id: ID
    plan: String
    status: String
    receiptId: String
    pilotId: ID
    agentId: ID
    discountId: ID
    pilotAcceptedAt: String
    agentAcceptedAt: String
    pilotBounty: String
    pilotDistance: String
    pilotTransferId: String
    pilotTransferResult: String
    uploadedAt: String
    agent: User
    pilot: User
    notes: [Note]
    assets: [Asset]
    address: Address
    createdAt: String
    updatedAt: String
    distanceFromLocation: String
  }

  input JoinPilotInput {
    id: ID
    authorizedId: ID
    status: String
    pilotBounty: String
    pilotDistance: String
    pilotId: ID
  }

  input BailPilotInput {
    id: ID
    authorizedId: ID
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
    discountId: ID
    amountPaid: String
    needsAttention: Boolean
    rejectedDescription: String
    address: AddressInput
    photos: [String]
  }

  input UploadedInput {
    id: ID
    authorizedId: ID
    status: String
    uploadedAt: String
    rawUrl: String
  }

  input GetGalleryInput {
    uuid: String
  }

  input DestroyOrderInput {
    id: ID!
    authorizedId: ID!
  }

  type OrdersPayload {
    count: Int
    orders: [Order]
  }

  type OrderPayload {
    order: OrderPayloadFields
    auth: AuthPayload
  }

  type OrderPayloadFields {
    id: ID
    uuid: String
    plan: String
    agentId: ID
    receiptId: String
    pilotAcceptedAt: String
    agentAcceptedAt: String
    pilotBounty: String
    pilotDistance: String
    pilotTransferId: String
    pilotTransferResult: String
    reviewedAt: String
    history: String
    rejectedBy: ID
    rejectedAt: String
    completedAt: String
    status: String
    amountPaid: String
    uploadedAt: String
    address: Address
    notes: [Note]
    listing: Listing
    agent: User
    pilot: User
    assets: [Asset]
    discount: [Discount]
    contacts: [Contact]
    distanceFromLocation: Float
    createdAt: String
    updatedAt: String
  }

  type GalleryPayload{
    gallery: GalleryPayloadFields
  }

  type GalleryPayloadFields{
    id: ID
    uuid: String
    address: Address
    listing: Listing
    agent: User
    galleryAssets: [Asset]
  }
`

module.exports = Order
