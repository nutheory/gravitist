import gql from 'graphql-tag'

const Login = gql`
  mutation login($input: LoginInput!) {
    login(input: $input){
      token
    }
  }
`

export default Login
