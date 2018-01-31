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
    uploader: User
    meta: String
    verified: Boolean
    active: Boolean
    createdAt: String
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
