import gql from 'graphql-tag'

const getOrder = gql`
  query($input: GetProtectedInput){
    getOrder(input: $input){
      order {
        id
        plan
        status
        receiptId
        createdAt
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
          type
          name
          email
        }
        pilot {
          id
          type
          name
          email
        }
        editor {
          id
          type
          name
          email
        }
        assets {
          id
          name
          type
          url
          size
          awsId
          uploaderId
        }
      }
    }
  }
`

export default getOrder
