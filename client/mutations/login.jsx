import gql from 'graphql-tag'

const Login = gql`
  mutation login($input: LoginInput!) {
    login(input: $input){
      name
      email
      token
    }
  }
`

export default Login
