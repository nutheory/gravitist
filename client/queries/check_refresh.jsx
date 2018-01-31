import gql from 'graphql-tag'

const TokenRefreshCheck = gql`
  query tokenRefreshCheck{
    tokenRefreshCheck{
      user {
        refreshToken
      }
    }
  }
`

export default TokenRefreshCheck
