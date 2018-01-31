import gql from 'graphql-tag'

const AcceptTerms = gql`
  mutation($input: UpdateUserInput){
    updateUser(input: $input){
      user{
        termsAccepted
      }
      auth{
        token
      }
    }
  }
`

export default AcceptTerms
