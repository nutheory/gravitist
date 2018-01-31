import gql from 'graphql-tag'

const UpdateUser = gql`
  mutation($input: UpdateUserInput) {
    updateUser(input: $input){
      user {
        id
        name
        email
        bio
        customerId
        accountId
        type
        workRadius
        isVerified
        refreshToken
        address {
          address1
          address2
          city
          state
          zipCode
          lat
          lng
        }
      }
      auth {
        token
      }
    }
  }
`
export default UpdateUser
