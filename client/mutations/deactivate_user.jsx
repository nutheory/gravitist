import gql from 'graphql-tag'

const DeactivateUser = gql`
  mutation destroyAsset($input: DeactivateUserInput) {
    deactivateUser(input: $input){
      user {
        id
        deactivated
      }
    }
  }
`
export default DeactivateUser
