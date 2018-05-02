import gql from 'graphql-tag'

const JoinPilot = gql`
  mutation($input: JoinPilotInput) {
    joinPilot(input: $input) {
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

export default JoinPilot
