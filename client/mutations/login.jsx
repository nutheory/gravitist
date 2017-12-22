import gql from 'graphql-tag'

const Login = gql`
  mutation($input: LoginInput!) {
    loginUser(input: $input){
      user {
        id
        name
        email
        companyId
        companyOwner
        customerId
        type
        address {
          address1
          address2
          type
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
export default Login
