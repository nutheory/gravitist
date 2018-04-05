const Contact = `

  type Contact {
    id: ID
    status: String
    name: String
    content: String
    type: String
    default: Boolean
    createdAt: String
    updatedAt: String
  }

  input ContactInput {
    id: ID
    status: String
    name: String
    content: String
    type: String
    default: Boolean
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
    default: Boolean
    createdAt: String
    updatedAt: String
  }

`

module.exports = Contact
