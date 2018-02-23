import gql from 'graphql-tag'

const GetAssets = gql`
  query getAssets($input: AssetCollectionInput){
    getAssets(input: $input){
      assets {
        id
        assetableId
        assetableName
        name
        type
        url
        awsId
        active
        default
        createdAt
      }
    }
  }
`

export default GetAssets
