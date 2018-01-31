import gql from 'graphql-tag'

const getOrder = gql`
  query getOrder($input: GetProtectedInput){
    getOrder(input: $input){
      order {
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
              id
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
        editor {
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
          size
          awsId
          uploader {
            id
            avatar {
              id
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

export default getOrder
