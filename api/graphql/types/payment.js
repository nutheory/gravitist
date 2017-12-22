const Payment = `

  input CreateSourceInput{
    authorizedId: ID
    customerId: String
    token: String
  }

  input DestroySourceInput{
    authorizedId: ID
    customerId: String
    cardId: String
  }

  type DestroySourcePayload{
    id: String
  }

  input SetDefaultSourceInput{
    authorizedId: ID
    customerId: String
    sourceId: String
  }

  type CustomerPayload {
    customer: CustomerFields
  }

  type CustomerFields {
    id: String
    default_source: String
    object: String
    created: Int
    description: String
    discount: String
    metadata: String
    email: String
    sources: SourceFields
  }

  type SourceFields {
    id: String
    object: String
    data: [CardFields]
    has_more: Boolean
    total_count: Int
    url: String
  }

  type SourceDataFields {
    id: String
    created: Int
    object: String
    owner: OwnerFields
    status: String
    type: String
    card: CardFields
  }

  type OwnerFields {
    email: String
    name: String
    phone: String
    verified_email: String
    verified_name: String
    verified_phone: String
  }

  type CardFields {
    id: String
    object: String
    brand: String
    country: String
    dynamic_last4: String
    cvc_check: String
    customer: String
    exp_month: Int
    exp_year: Int
    fingerprint: String
    funding: String
    last4: String
    metadata: String
  }
`

module.exports = Payment
