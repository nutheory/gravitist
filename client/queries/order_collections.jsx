import gql from 'graphql-tag'

const GetOrders = gql`
  query getOrders($input: OrderCollectionInput){
    getOrders(input: $input){
      orders {
        id
        plan
        status
        receiptId
        pilotAcceptedAt
        editorAcceptedAt
        agentAcceptedAt
        createdAt
        pilotBounty
        pilotDistance
        distanceFromLocation
        address {
          address1
          address2
          city
          state
          zipCode
          lat
          lng
        }
        agent {
          id
          avatar {
            id
            url
          }
          type
          name
          email
        }
        pilot {
          id
          avatar {
            id
            url
          }
          type
          name
          email
        }
        assets {
          id
          name
          type
          url
        }
      }
    }
  }
`

export default GetOrders
