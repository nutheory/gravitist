import gql from 'graphql-tag'

const GetNotes = gql`
  query getNotes($input: NoteCollectionInput){
    getNotes(input: $input){
      notes {
        id
        author{
          id
          type
          name
          email
          avatar{
            id
            url
          }
        }
        body
        visibility
        createdAt
        updatedAt
      }
    }
  }
`

export default GetNotes
