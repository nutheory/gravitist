import gql from 'graphql-tag'

const RejectOrder = gql`
  mutation($input: UpdateOrderInput){
    rejectOrder(input: $input){
      order{
        id
      }
    }
  }
`

export default RejectOrder
