import gql from 'graphql-tag'

const DestroyNote = gql`
  mutation destroyNote($input: DestroyNoteInput) {
    destroyNote(input: $input){
      note{
        id
      }
    }
  }
`
export default DestroyNote
