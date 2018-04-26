import gql from 'graphql-tag'

const CreateDiscount = gql`
  mutation($input: CreateDiscountInput) {
    createDiscount(input: $input){
      discount{
        id
        code
      }
    }
  }
`

export default CreateDiscount
