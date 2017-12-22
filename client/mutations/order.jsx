import gql from 'graphql-tag'

const createOrderWithUser = gql`
  mutation($input: OrderWithUserInput) {
    createOrderWithUser(input: $input){
      order {
        id
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
      auth {
        token
      }
    }
  }
`
export default createOrderWithUser
