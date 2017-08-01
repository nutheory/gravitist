import gql from 'graphql-tag'

const AgentOrders = gql`
  query AgentOrders{
    agentOrders{
      id
      status
      address{
        address1
        city
      }
    }
  }
`

export default AgentOrders
