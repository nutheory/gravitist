import gql from 'graphql-tag'

const CreateDiscount = gql`
  mutation($input: CreateDiscountInput) {
    createDiscount(input: $input){
      id
      code
    }
  }
`

export default CreateDiscount
