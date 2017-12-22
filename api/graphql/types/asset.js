const Asset = `
  type Asset {
    id: ID
    assetableId: ID
    assetableType: String
    name: String
    type: String
    url: String
    size: String
    meme: String
    awsId: String
    uploaderId: ID
    meta: String
    verified: Boolean
    active: Boolean
  }

  input AssetInput {
    id: ID
    name: String
    type: String
    url: String
    size: String
    meme: String
    awsId: String
    uploaderId: ID
    meta: String
    verified: Boolean
    active: Boolean
  }

  type AssetPayload {
    id: ID
    name: String
    type: String
    url: String
    size: String
    meme: String
    awsId: String
    uploaderId: ID
    meta: String
    verified: Boolean
    active: Boolean
  }
`
module.exports = Asset
