import gql from 'graphql-tag'

const User = gql`
  query currentUser{
    currentUser{
      user{
        id
        name
        email
        type
      }
    }
  }
`

export default User
