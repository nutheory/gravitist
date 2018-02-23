import gql from 'graphql-tag'

const DestroyAsset = gql`
  mutation destroyAsset($input: AssetInput) {
    destroyAsset(input: $input){
      asset{
        id
      }
    }
  }
`
export default DestroyAsset
