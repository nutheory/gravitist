const TransloaditClient = require("transloadit")
const Crypto = require('crypto')
const _ = require('lodash')
const Aws = require('aws-sdk')
const config = require('../config')
const s3 = new Aws.S3({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: 'us-west-1',
  apiVersion: '2006-03-01'
})
const db = require('../models')
const { order } = require('./orders')
const { utcDateString } = require('../utils/helpers')
const { returnTokenAndUserInfo, getFullUser } = require('./users')
const { UnknownError, UnauthorizedError, AlreadyAuthenticatedError, ForbiddenError } = require('../utils/errors')
const transloadit = new TransloaditClient(config.transloadit)
const env = process.env.NODE_ENV


async function avatarUploader({ file, user }){
  console.log('UPPPPPPP File',file)
  const assemblyOptions = {
    params: {
      template_id: config.assemblies[env].avatar,
      fields: { userId: user.id, userType: user.type },
      notify_url: `${config.base_url[env]}/avatar-notify-url`
    }
  }
  return uploadFile(file.stream, assemblyOptions).catch(err => { throw err })
}

async function logoUploader({ file, body }){
  //const companyId = body?

  const assemblyOptions = {
    params: {
      template_id: config.assemblies[env].logo,
      fields: { companyId },
      notify_url: `${config.base_url[env]}/logo-notify-url`
    }
  }
  return uploadFile(file.stream, assemblyOptions).catch(err => { throw err })
}

async function insuranceUploader({ file, user }){
  const assemblyOptions = {
    params: {
      template_id: config.assemblies[env].insurance,
      fields: { userId: user.id, userType: user.type },
      notify_url: `${config.base_url[env]}/insurance-notify-url`
    }
  }
  return uploadFile(file.stream, assemblyOptions).catch(err => { throw err })
}

async function licenseUploader({ file, user }){
  const assemblyOptions = {
    params: {
      template_id: config.assemblies[env].license,
      fields: { userId: user.id, userType: user.type },
      notify_url: `${config.base_url[env]}/license-notify-url`
    }
  }
  return uploadFile(file.stream, assemblyOptions).catch(err => { throw err })
}

async function pilotOrderUploader({ body, files, user }){
  files.map((file, i) => { transloadit.addStream(`pilot-stream-${i}`, file.stream) })
  const assemblyOptions = {
    params: {
      template_id: config.assemblies[env].order_pilot,
      fields: { orderId: body.orderId, pilotId: user.id },
      notify_url: `${config.base_url[env]}/pilot-order-notify-url`
    }
  }
  return new Promise((resolve, reject) => {
    return transloadit.createAssembly(assemblyOptions, (err, res) => {
      if (err) { throw err }
      resolve({ uploads: { uploadCount: res.uploads.length, status: res.ok } })
    })
  })
}

async function destroyAsset(url, { user }){
  const assetToDestroy = db.Asset.findOne({ where: { uploaderId: user.id, url } })
  const splitUrl = url.split('.com/')

  return new Promise((resolve, reject) => {
    const params = {  Bucket: 'homefilming', Key: splitUrl[1] }
    return s3.deleteObject(params, function(err, data) {
      if(err){ throw err }
      resolve("deleted")
    })
  })
}

async function updateActiveToggle(){

}

module.exports = {
  avatarUploader,
  logoUploader,
  insuranceUploader,
  licenseUploader,
  pilotOrderUploader,
  pilotOrderUploadResult,
  uploadResult,
  destroyAsset
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////// Receivers

async function pilotOrderUploadResult({ body }){
  if(!transloaditResultValid(body.transloadit, body.signature)){ throw UnauthorizedError() }
  const { results, fields } = JSON.parse(body.transloadit)
  const { orderId, pilotId } = fields
  _.each(results, (assemblyResults, assemblyName) => {
    assemblyResults.map( async (aR) => {
      const name = getNameFromUrl(aR.ssl_url)
      const imageId = getIdFromUrl(aR.ssl_url)
      await db.Asset.create({ assetableId: orderId, assetableType: 'order',
        url: aR.ssl_url, uploaderId: pilotId, ext: aR.ext, type: aR.type,
        mime: aR.mime, size: aR.size, meta: aR.meta, name, imageId })
    })
  })
}

async function uploadResult({ body, user }, model, uploadName){
  // console.log(chalk.blue.bold('BODY'), body)
  if(!transloaditResultValid(body.transloadit, body.signature)){ throw UnauthorizedError() }
  const { results, fields } = JSON.parse(body.transloadit)
  // console.log(chalk.blue.bold('REZULTS'), results)
  // console.log(chalk.blue.bold('FIELDS'), fields)
  const { ssl_url, ext, type, mime, size, meta } = results[uploadName][0]
  const name = getNameFromUrl(ssl_url)
  console.log(chalk.blue.bold('Name'), name)
  const awsId = getIdFromUrl(ssl_url)
  console.log(chalk.blue.bold('aws'), awsId)
  const asset = await db.Asset.findOne({ where: {assetableId: fields.userId, assetable: model,
    assetableName: name, awsId, active: true } })
  console.log(chalk.blue.bold('ASSET'), asset)
  const toggle = await activeToggle(asset)
  console.log(chalk.blue.bold('Toggle'), toggle)
  const uploaded = await db.Asset.create({ assetableId: fields.userId, assetable: model,
    assetableName: name, url: ssl_url, ext, type, mime, size, active: true,
    meta, name, awsId, uploaderId: fields.userId }).catch(err => { throw err })
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
///// Utils

function uploadFile(file, opts){
  transloadit.addStream(`upload`, file)
  return new Promise((resolve,reject) => {
    return transloadit.createAssembly(opts, (err, res) => {
      if (err) { throw err }
      resolve({ upload: { status: res.ok }})
    })
  })
}

async function activeToggle(asset){
  if(asset){
    const status = asset.active ? false : true
    const updated = await asset.update({ active: status }).catch(err => { throw err })
    return updated
  }
}

function createAssetObj({ ssl_url, ext, type, mime, size, meta }){

  return {
    url: ssl_url,
    ext,
    type,
    mime,
    size,
    meta
  }
}

function getNameFromUrl(url){
  const start = url.lastIndexOf('/')
  const end = url.lastIndexOf('_')
  return url.substring(start+1,end)
}

function getIdFromUrl(url){
  const start = url.lastIndexOf('_')
  return url.substring(start+1)
}

function transloaditResultValid(transloaditData, signature){
  const calcSignature = Crypto
    .createHmac('sha1', config.transloadit.authSecret)
    .update(Buffer.from(transloaditData, 'utf-8'))
    .digest('hex')
  if (calcSignature === signature) {
    return true
  } else {
    return false
  }
}
