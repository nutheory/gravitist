import gql from 'graphql-tag'

const UploadedOrder = gql`
  mutation($input: UploadedInput) {
    uploadedOrder(input: $input){
      order {
        id
        status
        uploadedAt
      }
    }
  }
`
export default UploadedOrder
