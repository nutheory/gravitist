import gql from 'graphql-tag'

const GetOrder = gql`
  query getOrder($input: GetProtectedInput){
    getOrder(input: $input){
      order {
        id
        uuid
        plan
        status
        receiptId
        pilotTransferId
        pilotTransferResult
        pilotDistance
        pilotBounty
        pilotAcceptedAt
        createdAt
        uploadedAt
        completedAt
        reviewedAt
        history
        rejectedBy
        rejectedAt
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
          mlsStatus
          mlsNumber
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
        contacts {
          name
          content
          createdAt
        }
      }
    }
  }
`

export default GetOrder
