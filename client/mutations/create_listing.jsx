import gql from 'graphql-tag'

const CreateListing = gql`
  mutation($input: CreateListingInput) {
    createListing(input: $input){
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

export default CreateListing
