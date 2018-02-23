import gql from 'graphql-tag'

const createOrder = gql`
  mutation($input: OrderInput) {
    createOrder(input: $input){
      order {
        id
        agentId
        plan
        receiptId
        status
        address {
          address1
          address2
          city
          state
          zipCode
          lat
          lng
        }
      }
    }
  }
`
export default createOrder
