import gql from 'graphql-tag'

const Missions = gql`
  query missions{
    missions{
      id
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

export default Missions
