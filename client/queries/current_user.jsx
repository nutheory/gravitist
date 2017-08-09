import gql from 'graphql-tag'

const User = gql`
  query currentUser{
    currentUser{
      id
      name
      email
      type
    }
  }
`

export default User
