const Discount = `
  type Discount {
    id: ID
    code: String
    startsAt: String
    endsAt: String
    appliesTo: String
    usageCount: Int
    maxUsageCount: Int
    amount: String
  }

  input CreateDiscountInput {
    code: String
    startsAt: String
    endsAt: String
    appliesTo: String
    maxUsageCount: Int
    amount: String
  }

  input ApplyDiscountInput {
    code: String
  }

  input DiscountCollectionInput {
    id: ID
  }

  input DestroyDiscountInput {
    id: ID
  }

  type DiscountsPayload {
    discounts: [Discount]
  }

  type DiscountPayload {
    discount: Discount
  }
`

module.exports = Discount
