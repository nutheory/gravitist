import gql from 'graphql-tag'

const ToggleDefaultAsset = gql`
  mutation toggleDefaultAsset($input: AssetInput) {
    toggleDefaultAsset(input: $input){
      asset{
        id
      }
    }
  }
`
export default ToggleDefaultAsset
