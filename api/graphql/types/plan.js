const Plan = `
  type Plan {
    name: String
    actualPrice: String
  }

  input PlanInput {
    id: ID
    name: String
    actualPrice: String
  }

  type PlanPayload {
    plan: PlanPayloadFields
  }

  type PlanPayloadFields {
    name: String
    actualPrice: String
  }
`

module.exports = Plan
