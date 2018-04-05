import gql from 'graphql-tag'

const ResetPassword = gql`
  mutation($input: ResetPasswordInput) {
    resetPassword(input: $input){
      user {
        id
        name
        email
      }
      auth {
        token
      } 
    }
  }
`
export default ResetPassword
