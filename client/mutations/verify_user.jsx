import gql from 'graphql-tag'

const VerifyUser = gql`
  mutation($input: VerifyUserInput) {
    verifyUser(input: $input){
      user{
        id
        isVerified
      }
    }
  }
`
export default VerifyUser
