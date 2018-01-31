import gql from 'graphql-tag'

const createPilot = gql`
  mutation($input: PilotInput) {
    createPilot(input: $input){
      user {
        id
        name
        email
        customerId
        type
        workRadius
        address {
          address1
          address2
          city
          state
          zipCode
          lat
          lng
        }
      }
      auth {
        token
      }
    }
  }
`
export default createPilot
