import gql from 'graphql-tag'

const CreateNote = gql`
  mutation($input: CreateNoteInput) {
    createNote(input: $input){
      note {
        id
        author{
          id
          type
          name
          email
        }
        body
        visibility
        createdAt
        updatedAt
      }
    }
  }
`
export default CreateNote
