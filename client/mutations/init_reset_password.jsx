import gql from 'graphql-tag'

const InitResetPassword = gql`
  mutation initResetPassword($input: InitResetPasswordInput) {
    initResetPassword(input: $input){
      user {
        name
        email
      }
    }
  }
`
export default InitResetPassword
