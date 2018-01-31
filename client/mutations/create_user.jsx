import gql from 'graphql-tag'

const CreatePilot = gql`
  mutation($input: UserInput) {
    createUser(input: $input){
      user {
        id
        name
        email
        type
      }
      auth {
        token
      }
    }
  }
`
export default CreatePilot
