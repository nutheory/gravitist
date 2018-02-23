const Asset = `
  type Asset {
    id: ID
    assetableId: ID
    assetable: String
    assetableName: String
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
    default: Boolean
    createdAt: String
  }

  input AssetCollectionInput {
    authorizedId: ID
    modelId: ID
    modelType: String
    modelName: [String]
    type: String
  }

  input AssetInput {
    id: ID
    authorizedId: ID
    modelId: ID
    modelType: String
    modelName: String
    asset: AssetInputFields
  }

  input AssetInputFields {
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
    default: Boolean
  }

  type AssetsPayload {
    assets: [AssetPayloadFields]
  }

  type AssetPayload {
    asset: AssetPayloadFields
  }

  type AssetPayloadFields {
    id: ID
    name: String
    assetableId: ID
    assetableName: String
    type: String
    url: String
    size: String
    meme: String
    awsId: String
    uploaderId: ID
    meta: String
    verified: Boolean
    active: Boolean
    default: Boolean
    createdAt: String
  }
`
module.exports = Asset
