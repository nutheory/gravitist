import gql from 'graphql-tag'

const OpenMissions = gql`
  query OpenMissions{
    openMissions{
      id
      status
      createdAt
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

export default OpenMissions
