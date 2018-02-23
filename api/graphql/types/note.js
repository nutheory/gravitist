const Note = `

  type Note {
    id : ID
    author: User
    body: String
    visibility: JSON
    createdAt: String
    updatedAt: String
  }

  input NoteCollectionInput {
    modelId: ID
    model: String
  }

  input CreateNoteInput {
    modelId: ID
    model: String
    note: NoteInputFields
  }

  input NoteInputFields {
    body: String
    visibility: JSON
  }

  input DestroyNoteInput {
    id: ID!
    authorizedId: ID!
  }

  type NotePayload {
    note: Note
  }

  type NotesPayload {
    notes: [Note]
  }
`

module.exports = Note
