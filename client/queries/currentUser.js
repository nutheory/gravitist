import gql from 'graphql-tag'

const User = gql`
  query user{
    user{
      id
      name
      email
      accountId
      type
    }
  }
`

export default User
