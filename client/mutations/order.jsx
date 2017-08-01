import gql from 'graphql-tag'

const createOrderWithUser = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input){
      id
      plan
      address {
        address1
        address2
        city
        state
        zip
      }
      user {
        name
        email
      }
    }
  }

`

export default createOrderWithUser
