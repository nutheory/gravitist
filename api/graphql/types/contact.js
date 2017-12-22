const Contact = `

  type Contact {
    id : ID
    name: String
    content: String
    type: String
    createdAt: String
    updatedAt: String
  }

  input ContactInput {
    name: String
    content: String
    type: String
  }

  input UpdateContactInput {
    id: ID!
    authorizedId: ID!
  }

  input DestroyContactInput {
    id: ID!
    authorizedId: ID!
  }

  type ContactPayload {
    contacts: [ContactPayloadFields]
  }

  type ContactPayloadFields {
    id: ID
    name: String
    content: String
    type: String
    createdAt: String
    updatedAt: String
  }

`

module.exports = Contact
