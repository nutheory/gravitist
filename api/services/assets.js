const TransloaditClient = require("transloadit")
const Crypto = require('crypto')
const _ = require('lodash')
const { find, propEq } = require('ramda')
const Aws = require('aws-sdk')
const config = require('../config')
const s3 = new Aws.S3({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: 'us-west-1',
  apiVersion: '2006-03-01'
})
const db = require('../models')
// const { order } = require('./orders')
const ContactTypes = require('../../client/utils/contact_types')
const { update } = require('./users')
// const { order } = require('./orders')
const { UnknownError, UnauthorizedError, AlreadyAuthenticatedError, ForbiddenError } = require('../utils/errors')
const transloadit = new TransloaditClient(config.transloadit)
const env = process.env.NODE_ENV
const chalk = require('chalk')

async function avatarUploader({ file, user, body }){
  const assemblyOptions = {
    params: {
      template_id: config.assemblies[env].avatar,
      fields: {
        name: body.name,
        source: body.source,
        uploadToId: body.uploadToId,
        userType: user.type,
        uploaderId: user.id,
        instanceOf: body.instanceOf },
      notify_url: `${config.base_url[env]}/avatar-notify-url`
    }
  }
  return uploadFile(file.stream, assemblyOptions).catch(err => { throw err })
}

async function logoUploader({ file, body }){
  const assemblyOptions = {
    params: {
      template_id: config.assemblies[env].logo,
      fields: { companyId },
      notify_url: `${config.base_url[env]}/logo-notify-url`
    }
  }
  return uploadFile(file.stream, assemblyOptions).catch(err => { throw err })
}

async function insuranceUploader({ file, user, body }){
  const assemblyOptions = {
    params: {
      template_id: config.assemblies[env].insurance,
      fields: {
        name: body.name,
        source: body.source,
        uploadToId: body.uploadToId,
        userType: user.type,
        uploaderId: user.id,
        instanceOf: body.instanceOf },
      notify_url: `${config.base_url[env]}/insurance-notify-url`
    }
  }
  return uploadFile(file.stream, assemblyOptions).catch(err => { throw err })
}

async function licenseUploader({ file, user, body }){
  const assemblyOptions = {
    params: {
      template_id: config.assemblies[env].license,
      fields: {
        name: body.name,
        source: body.source,
        uploadToId: body.uploadToId,
        userType: user.type,
        uploaderId: user.id,
        instanceOf: body.instanceOf },
      notify_url: `${config.base_url[env]}/license-notify-url`
    }
  }
  return uploadFile(file.stream, assemblyOptions).catch(err => { throw err })
}

async function buildPresignedRequest({ body, user }){
  const params = {
    Bucket: 'homefilming',
    Key: `${body.model}/${body.modelId}/raw/${Date.now()}`,
    Expires: 604800
  }
  return s3.getSignedUrl('putObject', params)
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

const buildOrderOverlay = async ({ usr, ordr }) => {
  console.log(chalk.blue.bold('BUILD ORDER'), ordr)
  const contact = await ordr.agent.contacts.filter(cnt => cnt.default ? cnt : null)[0]
  const contactType = find(propEq('type', contact.type))(ContactTypes)
  const avatar = ordr.agent.avatar ? ordr.agent.avatar : null
  const assemblyOptions = {
    params: {
      template_id: config.assemblies[env].video_overlay,
      fields: {
        bgUrl: 'https://s3-us-west-1.amazonaws.com/homefilming/video_canvas.png',
        avatarXoffset: 20,
        avatarYoffset: 14,
        avatarUrl: avatar ? avatar.url : 'https://s3-us-west-1.amazonaws.com/homefilming/no_avatar.png',
        nameXoffset: avatar ? 200 : 20,
        nameYoffset: 76,
        contactXoffset: avatar ? 200 : 20,
        contactYoffset: 32,
        addressXoffset: 20,
        addressYoffset: 72,
        cityXoffset: 20,
        cityYoffset: 32,
        name: ordr.agent.name,
        contact: `${ contactType.humanized }: ${ contact.content }`,
        address: ordr.address.address1,
        city: ordr.address.city,
        pilotId: usr.id,
        orderId: ordr.id,
        instanceOf: 'overlay'
      },
      notify_url: `${config.base_url[env]}/overlay-notify-url`
    }
  }
  const upload = performAssembly(assemblyOptions).catch(err => { console.log(chalk.blue.bold('ERR'), err) })
}

const finalProcessing = async ({ body }) => {
  const { results, fields } = JSON.parse(body.transloadit)
  const order = await db.Order.findById(fields.orderId, {})
  console.log(chalk.blue.bold('BODY order'), order)
  console.log(chalk.blue.bold('BODY fields'), fields)

  const processes = ["process"]
  processes.forEach((prcs, i) => {
    const assemblyOptions = {
      params: {
        template_id: config.assemblies[env][`${prcs}`],
        fields: {
          importKey: `${order.rawUrl}`,
          pilotId: order.pilotId,
          orderId: order.id
        },
        notify_url: `${config.base_url[env]}/${prcs}-notify-url`
      }
    }
    const upload = performAssembly(assemblyOptions).catch(err => { console.log(chalk.blue.bold('ERR'), err) })
  })
}

module.exports = {
  avatarUploader,
  logoUploader,
  insuranceUploader,
  licenseUploader,
  buildPresignedRequest,
  finalProcessing,
  uploadResult,
  buildOrderOverlay,
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

async function uploadResult({ body }, model, uploadName){
  if(!transloaditResultValid(body.transloadit, body.signature)){ throw UnauthorizedError() }
  const { results, fields } = JSON.parse(body.transloadit)
  const { ssl_url, ext, type, mime, size, meta } = results[uploadName][0]
  const awsId = getIdFromUrl(ssl_url)
  const assets = await db.Asset.findAll({ where: {assetableId: fields.uploadToId, assetable: model,
    assetableName: fields.instanceOf, active: true } })
  const toggle = await activeToggle(assets)
  const uploaded = await db.Asset.create({ assetableId: fields.uploadToId, assetable: model,
    assetableName: fields.instanceOf, url: ssl_url, ext, type, mime, size, active: true,
    meta, name: fields.name, awsId, uploaderId: fields.uploaderId || fields.uploadToId }).catch(err => { throw err })
  await update({ id: fields.uploadToId, user: { refreshToken: true }})
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

function performAssembly(opts){
  return new Promise((resolve,reject) => {
    return transloadit.createAssembly(opts, (err, res) => {
      if (err) { throw err }
      resolve({ create: { status: res.ok }})
    })
  })
}

function activeToggle(assets){
  if(assets){
    assets.map(async (asset) => {
      const status = asset.active ? false : true
      const updated = await asset.update({ active: status }).catch(err => { throw err })
      return updated
    })
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

// "captures": {
//   "use": "imported",
//   "robot": "/video/thumbs",
//   "ffmpeg_stack": "v2.2.3",
//   "result": true,
//   "count": 40
// },
