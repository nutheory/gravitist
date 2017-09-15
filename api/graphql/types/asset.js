const Upload = require('./upload')

const Asset = `
  type Asset {
    id: ID
    assetableId: ID
    assetableType: String
    filename: String
    filetype: String
    url: String
    filesize: String
  }

  input AssetInput {
    assetableId: ID
    assetableType: String
    asset: UploadInput
  }

  type AssetPayload {
    id: ID
    assetableId: ID
    assetableType: String
    filename: String
    filetype: String
    url: String
    filesize: String
  }
`
module.exports = Asset
