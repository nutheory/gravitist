import gql from 'graphql-tag'

const CreateLead = gql`
  mutation($input: CreateLeadInput) {
    createLead(input: $input){
      lead{
        id
        name
      }
    }
  }
`

export default CreateLead
