import gql from 'graphql-tag'

const GetUsers = gql`
  query($input: UserCollectionInput){
    getUsers(input: $input){
      count
      users{
        id
        name
        email
        type
        bio
        workRadius
        abortCount
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

export default GetUsers
