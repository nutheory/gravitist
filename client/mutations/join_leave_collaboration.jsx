import gql from 'graphql-tag'

const JoinOrLeaveCollaboration = gql`
  mutation($input: CollaborationInput) {
    joinOrLeaveCollaboration(input: $input) {
      order {
        status
        pilotAcceptedAt
        editorAcceptedAt
        agentAcceptedAt
        editor {
          id
          type
        }
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

export default JoinOrLeaveCollaboration
