import gql from 'graphql-tag'

const GetUser = gql`
  query($input: GetProtectedInput){
    getUser(input: $input){
      user{
        id
        name
        email
        type
        bio
        workRadius
        customerId
        accountId
        isVerified
        termsAccepted
        createdAt
        updatedAt
        contacts {
          id
          type
          content
          default
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
        avatars {
          id
          name
          type
          url
          active
          default
          createdAt
        }
        licenses {
          id
          name
          type
          url
          createdAt
        }
        insurances {
          id
          name
          type
          url
          createdAt
        }
      }
    }
  }
`

export default GetUser
