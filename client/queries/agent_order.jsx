import gql from 'graphql-tag'

const AgentOrder = gql`
  query AgentOrder($id: ID){
    agentOrder(id: $id){
      id
      plan
      receiptId
      status
      address {
        address1
        city
        zipCode
      }
      user {
        name
        email
      }
      createdAt
      updatedAt
    }
  }
`

export default AgentOrder
