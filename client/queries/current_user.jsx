import gql from 'graphql-tag'

const User = gql`
  query current_user{
    current_user{
      id
      name
      email
      type
    }
  }
`

export default User
