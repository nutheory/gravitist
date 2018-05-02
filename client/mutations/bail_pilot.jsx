import gql from 'graphql-tag'

const BailPilot = gql`
  mutation($input: BailPilotInput) {
    bailPilot(input: $input) {
      order {
        status
        pilotAcceptedAt
        agentAcceptedAt
        agent {
          id
          type
        }
        pilot {
          id
          type
        }
      }
    }
  }
`

export default BailPilot
