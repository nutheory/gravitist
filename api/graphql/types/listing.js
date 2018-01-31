const Listing = `

  type Listing {
    id : ID
    beds: String
    baths: String
    price: String
    mlsNumber: String
    sqft: String
    type: String
    status: String
    description: String
    features: JSON
    createdAt: String
    updatedAt: String
  }

  input ListingInputFields {
    beds: String
    orderId: ID
    baths: String
    price: String
    mlsNumber: String
    sqft: String
    type: String
    status: String
    description: String
    features: JSON
  }

  input CreateListingInput {
    listing: ListingInputFields
  }

  input UpdateListingInput {
    id: ID
    authorizedId: ID
    listing: ListingInputFields
  }

  type ListingPayload {
    listing: Listing
  }
`

module.exports = Listing
