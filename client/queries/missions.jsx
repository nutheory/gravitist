import gql from 'graphql-tag'

const GetMissions = gql`
  query getMissions($input: GetListInput){
    getMissions(input: $input){
      id
      agentId
      status
      createdAt
      distanceFromLocation
      plan
      address{
        address1
        address2
        city
        state
        zipCode
        lat
        lng
      }
    }
  }
`

export default GetMissions
