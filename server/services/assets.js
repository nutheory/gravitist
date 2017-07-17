const cloudinary = require('cloudinary')
const _ = require('lodash')
const config = require('../config')
const Db = require('../models')
const AssetDb = Db.sequelize.models.asset

AvatarUpload = async (type, { asset }) => {
  console.log('ASSETASSETASSETASSETASSETASSETASSETASSETASSET', asset)
  const cloudRes = await cloudinary.v2.uploader.upload(
    asset.path, { folder: "users/avatars" }, (error, result) => {
    if(error) {return false} else {return result}
  })

  // return await AssetDb.create({})
}

DocumentUpload = async (type, {}) => {
  // const cloudinaryResponse
  //
  // const uploaded = await
}

module.exports = { AvatarUpload, DocumentUpload }
