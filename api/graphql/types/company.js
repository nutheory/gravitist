const Company = `
  type Company {
    id: ID
    name: String
    key: String
    subtitle: String
    visible: Boolean
    styles: String
    logo: Asset
  }

  input CompanyInput {
    name: String
    subtitle: String
    visible: Boolean
    styles: String
    logo: AssetInput
  }

  input UpdateCompanyInput {
    id: ID!
    authorizedId: ID!
    name: String
    subtitle: String
    visible: Boolean
    styles: String
    logo: AssetInput
  }

  input DestroyCompanyInput {
    id: ID!
    authorizedId: ID!
  }

  input JoinCompanyInput{
    id: ID!
    key: String!
  }

  input LeaveCompanyInput{
    name: String!
  }

  type CompanyPayload {
    company: CompanyPayloadFields
  }

  type CompanyPayloadFields{
    id: ID
    ownerId: ID
    name: String
    key: String
    subtitle: String
    visible: Boolean
    styles: String
    logo: AssetPayload
  }
`

module.exports = Company
