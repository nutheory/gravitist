import gql from 'graphql-tag'

const User = gql`
  query current_user{
    current_user{
      id
      name
      email
      accountId
      type
    }
  }
`

export default User
