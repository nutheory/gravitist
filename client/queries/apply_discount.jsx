import gql from 'graphql-tag'

const ApplyDiscount = gql`
  query applyDiscount($input: ApplyDiscountInput){
    applyDiscount(input: $input){
      discount{
        id
        code
        startsAt
        endsAt
        appliesTo
        usageCount
        maxUsageCount
        amount
      }
    }
  }
`

export default ApplyDiscount
