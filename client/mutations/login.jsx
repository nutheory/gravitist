import gql from 'graphql-tag'

const Login = gql`
  mutation login($input: LoginInput!) {
    login(input: $input){
      id
      name
      email
      type
      token
    }
  }
`

export default Login
