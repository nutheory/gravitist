const Upload = `
  type Upload {
    name: String
    preview: String
    type: String
    path: String
    size: Int
  }

  input UploadInput {
    name: String
    preview: String
    type: String
    path: String
    size: Int
  }

  type UploadPayload {
    name: String
    type: String
    path: String
    size: Int
  }
`
module.exports = Upload
