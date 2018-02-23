import gql from 'graphql-tag'

const ApproveOrder = gql`
  mutation($input: UpdateOrderInput){
    approveOrder(input: $input){
      order{
        id
      }
    }
  }
`

export default ApproveOrder
