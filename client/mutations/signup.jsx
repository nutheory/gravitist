import gql from 'graphql-tag'

const createUserMutation = gql`
  mutation (
    $name: String!
    $email: String!
    $password: String!
    $type: String!
    $contacts: [Contact]
    $address: Address
  ){
    createUser(
      name: $name
      email: $email
      password: $password
      type: $type
      contacts: $contacts
      address: $address
    ){
      id
      name
      email
      contacts {
        id
      }
      address {
        id
      }
    }
  }
`
