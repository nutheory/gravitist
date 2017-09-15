const Plan = `
  type Plan {
    name: String
    actualPrice: String
  }

  input PlanInput {
    plan: PlanInputFields
  }

  input PlanInputFields {
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
