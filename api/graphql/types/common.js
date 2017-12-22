const Common = `

  input GetProtectedInput {
    id: ID
    authorizedId: ID
  }

  input GetCustomerInput {
    id: ID
    authorizedId: ID
    customerId: String
  }

  input GetListInput {
    sortKey: String
    sortValue: String
    sizeLimit: Int
    colOffset: Int
  }

`

module.exports = Common
