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

  input CreateLeadInput {
    contactableId: ID!
    lead: ContactInput
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

  type LeadPayload {
    lead: Contact
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
