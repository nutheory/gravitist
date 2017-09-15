const { AvatarUpload } = require('../../services/assets')
const _ = require('lodash')

const imageTypes = [ 'image/png', 'image/jpg', 'image/jpeg', 'image/gif' ]
const docTypes = [ 'application/pdf', 'application/msword' ]
const videoTypes = [  ]

async function fileResolver(root, { input }, ctx){
  if(input.assetableType === 'order' && _.includes(imageTypes, input.asset.type)){
    //
  }else if(input.assetableType === 'user' &&  _.includes(imageTypes, input.asset.type)){
    console.log("CTX", ctx)
    return await AvatarUpload(input.assetableType, input)
  }else if(input.assetableType === 'user' &&  _.includes(docTypes, input.asset.type)){
    //
  }else if(input.assetableType === 'company' &&  _.includes(imageTypes, input.asset.type)){
    //
  }
}

module.exports = { fileResolver }
