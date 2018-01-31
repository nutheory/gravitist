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
        status
        description
        features
        createdAt
        updatedAt
      }
    }
  }
`

export default CreateListing
