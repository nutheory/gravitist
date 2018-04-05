import gql from 'graphql-tag'

const GetDiscounts = gql`
  query getDiscounts($input: DiscountCollectionInput){
    getDiscounts(input: $input){
      discounts {
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

export default GetDiscounts
