import gql from 'graphql-tag'

const FileUpload = gql`
  mutation fileUpload($input: AssetInput) {
    fileUpload(input: $input){
      id
      assetableId
      assetableType
      filename
      filetype
      url
      filesize
    }
  }
`

export default FileUpload
