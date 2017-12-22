import gql from 'graphql-tag'

const getOrders = gql`
  query getOrders($input: GetListInput){
    getOrders(input: $input){
      id
      plan
      status
      receiptId
      address {
        address1
        address2
        city
        state
        zipCode
      }
    }
  }
`

export default getOrders
