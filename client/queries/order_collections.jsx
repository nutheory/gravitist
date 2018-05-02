import gql from 'graphql-tag'

const GetOrders = gql`
  query ($input: OrderCollectionInput){
    getOrders(input: $input){
      count
      orders {
        id
        plan
        status
        receiptId
        pilotAcceptedAt
        agentAcceptedAt
        createdAt
        updatedAt
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
