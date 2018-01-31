import gql from 'graphql-tag'

const UpdateOrder = gql`
  mutation($input: UpdateOrderInput) {
    updateOrder(input: $input){
      order{
        id
        plan
        status
        receiptId
        createdAt
        distanceFromLocation
        notes {
          author {
            id
            avatar {
              url
            }
            type
            name
            email
          }
          body
          visibility
        }
        listing {
          id
          beds
          baths
          price
          sqft
          type
          status
          description
          features
        }
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
            url
          }
          type
          name
          email
        }
        pilot {
          id
          avatar {
            url
          }
          type
          name
          email
        }
        editor {
          id
          avatar {
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
          size
          awsId
          uploader {
            id
            avatar {
              url
            }
            type
            name
            email
          }
        }
      }
    }
  }
`

export default UpdateOrder
