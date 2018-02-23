import gql from 'graphql-tag'

const UpdateListing = gql`
  mutation($input: UpdateListingInput) {
    updateListing(input: $input){
      listing{
        id
        beds
        baths
        price
        sqft
        type
        mlsNumber
        mlsStatus
        description
        features
        createdAt
        updatedAt
      }
    }
  }
`

export default UpdateListing
