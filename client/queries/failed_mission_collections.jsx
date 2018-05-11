import gql from 'graphql-tag'

const GetFailedMissions = gql`
  query($input: GetFailedMissionsInput){
    getFailedMissions(input: $input){
      failedMissions{
        order{
          id
          plan
          status
          address{
            address1
            address2
            city
            state
            zipCode
          }
        }
        rejectedByUser{
          id
          name
          email
        }
        createdAt
        typeOfFailure
        reason
      }
    }
  }
`

export default GetFailedMissions
