const TransloaditClient = require("transloadit")
const Crypto = require('crypto')
const { find, propEq, isNil, contains } = require('ramda')
const Aws = require('aws-sdk')
const s3 = new Aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-west-1',
  apiVersion: '2006-03-01'
})
const db = require('../models')
const ContactTypes = require('../../client/utils/contact_types')
const { update } = require('./users')
const {
  UnknownError,
  UnauthorizedError,
  AlreadyAuthenticatedError,
  ForbiddenError } = require('../utils/errors')
const transloadit = new TransloaditClient({
  authKey: process.env.TRANSLOADIT_AUTH_KEY,
  authSecret: process.env.TRANSLOADIT_SECRET_KEY
})
const env = `${process.env.ACTING_ENV}/`
const chalk = require('chalk')

async function toggleActive({ activeId, assetableId, assetable, assetableName }){
  const asset = await db.Asset.findById(activeId)
  if( asset ){ await asset.update({ active: asset.active ? false : true }).catch(err => { throw err }) }
}

async function toggleDefault({ defaultId, assetableId, assetable, assetableName }){
  const assets = await db.Asset.findAll({ where: { assetableId, assetable, assetableName, default: true } })
  if( assets.length > 0 ){ assets.map( async (asset) => await asset.update({ default: false }).catch(err => { throw err }) ) }
  const newDefault = await db.Asset.findById(defaultId)
  if( newDefault ){ await newDefault.update({ default: true }).catch(err => { throw err }) }
  if( assetableName === 'avatar' ){ await update({ attrs: { id: assetableId, user: { refreshToken: true }} }) }
}

const assets = async ({ assetableId, assetable, assetableName }) => {
  const assets = await db.Asset.findAll({ where: { assetableId, assetable, assetableName } })
  // console.log(chalk.blue.bold('ASSETS2'), assets)
  return { assets }
}

async function avatarUploader({ file, user, body }){
  const assemblyOptions = {
    params: {
      template_id: process.env.TRANSLOADIT_TEMPLATE_AVATAR,
      fields: {
        env,
        name: body.name,
        width: 420,
        height: 420,
        source: body.source,
        uploadToId: body.uploadToId == 'undefined' || undefined ? user.id : body.uploadToId,
        userType: user.type,
        uploaderId: user.id,
        instanceOf: body.instanceOf },
      notify_url: `${process.env.BASE_URL}/notifications/avatar`
    }
  }
  return uploadFile(file.stream, assemblyOptions).catch(err => { throw err })
}

async function logoUploader({ file, body }){
  const assemblyOptions = {
    params: {
      template_id: process.env.TRANSLOADIT_TEMPLATE_LOGO,
      fields: { env, companyId },
      notify_url: `${process.env.BASE_URL}/notifications/logo`
    }
  }
  return uploadFile(file.stream, assemblyOptions).catch(err => { throw err })
}

async function insuranceUploader({ file, user, body }){
  const assemblyOptions = {
    params: {
      template_id: process.env.TRANSLOADIT_TEMPLATE_DOCUMENTS,
      fields: {
        env,
        name: body.name,
        source: body.source,
        uploadToId: body.uploadToId == 'undefined' || undefined ? user.id : body.uploadToId,
        userType: user.type,
        uploaderId: user.id,
        instanceOf: body.instanceOf },
      notify_url: `${process.env.BASE_URL}/notifications/insurance`
    }
  }
  return uploadFile(file.stream, assemblyOptions).catch(err => { throw err })
}

async function licenseUploader({ file, user, body }){
  const assemblyOptions = {
    params: {
      template_id: process.env.TRANSLOADIT_TEMPLATE_DOCUMENTS,
      fields: {
        env,
        name: body.name,
        source: body.source,
        uploadToId: body.uploadToId == 'undefined' || undefined ? user.id : body.uploadToId,
        userType: user.type,
        uploaderId: user.id,
        instanceOf: body.instanceOf },
      notify_url: `${process.env.BASE_URL}/notifications/license`
    }
  }
  return uploadFile(file.stream, assemblyOptions).catch(err => { throw err })
}

const destroy = async ({ id, assetableId, assetable, assetableName, usr }) => {
  const assetToDestroy = await db.Asset.findOne({ where: {
    id, assetableId: usr.type === 'admin' ? assetableId : usr.id, assetable, assetableName } })
  const splitUrl = assetToDestroy.url.split('.com/')
  return new Promise((resolve, reject) => {
    const params = { Bucket: 'homefilming', Key: splitUrl[1] }
    return s3.deleteObject(params, (err, data) => {
      if( data.DeleteMarker === true ){ assetToDestroy.destroy() }
      if(err){ throw err }
      resolve("deleted")
    })
  })
}

const buildOrderOverlay = ({ usr, ordr }) => {
  console.log(chalk.blue.bold('BUILD ORDER'), ordr)
  const contactDef = ordr.agent.contacts.filter(cnt => cnt.default ? cnt : null)[0]
  const contactEx = ordr.agent.contacts.filter(cnt => !cnt.default ? cnt : null)[0]
  const contactDefType = contactDef ? find(propEq('type', contactDef.type))(ContactTypes) : null
  const contactExType = contactEx ? find(propEq('type', contactEx.type))(ContactTypes) : null

  const avatar = ordr.agent.avatar ? ordr.agent.avatar : null
  const assemblyOptions = {
    params: {
      template_id: process.env.TRANSLOADIT_TEMPLATE_OVERLAY,
      fields: {
        env,
        bgUrl: avatar ? `${process.env.ASSET_BASE}/video_canvas_blk.png` : `${process.env.ASSET_BASE}/video_canvas_blk_no_av.png`,
        avatarXoffset: 60,
        avatarYoffset: 70,
        avatarUrl: avatar ? avatar.url : `${process.env.ASSET_BASE}/no_avatar.png`,
        nameXoffset: avatar ? 350 : 40,
        nameYoffset: 172,
        contactOneXoffset: avatar ? 346 : 40,
        contactOneYoffset: 114,
        contactTwoXoffset: avatar ? 346 : 40,
        contactTwoYoffset: 70,
        addressXoffset: 40,
        addressYoffset: 172,
        cityXoffset: 40,
        cityYoffset: 124,
        name: ordr.agent.name,
        contactOne: contactDef ? formatContactInfo(contactDef, contactDefType) : '',
        contactTwo: contactEx ? formatContactInfo(contactEx, contactExType) : '',
        address: ordr.address.address1,
        city: ordr.address.city,
        pilotId: usr.id,
        orderId: ordr.id,
        location: 'buildOrderOverlay'
      },
      notify_url: `${process.env.BASE_URL}/notifications/overlay`
    }
  }
  const upload = performAssembly(assemblyOptions).catch(err => { console.log(chalk.blue.bold('ERR'), err) })
}

const processVideoInitPhotos = async ({ body }) => {
  const { results, fields } = JSON.parse(body.transloadit)
  const order = await db.Order.findById(fields.orderId, {})

  const assemblyOptions = {
    params: {
      template_id: process.env.TRANSLOADIT_TEMPLATE_PROCESS_VIDEO,
      fields: {
        env,
        importKey: `${order.rawUrl}`,
        pilotId: order.pilotId,
        orderId: order.id,
        location: 'processVideoInitPhotos'
      },
      notify_url: `${process.env.BASE_URL}/notifications/process-video`
    }
  }
  const upload = performAssembly(assemblyOptions).catch(err => { console.log(chalk.blue.bold('ERR'), err) })
}

const processPhotos = ({ ordr, photos }) => {
  photos.map(async (photoAwsId) => {
    db.Asset.findOne({ where: { awsId: photoAwsId } }).then(ph => ph.update({ active: true }))
  })
  const assemblyOptions = {
    params: {
      template_id: process.env.TRANSLOADIT_TEMPLATE_PROCESS_PHOTOS,
      fields: {
        env,
        importKeys: photos,
        orderId: ordr.id,
        location: 'processPhotos'
      },
      steps: { photo: { path: photos } },
      notify_url: `${process.env.BASE_URL}/notifications/process-photos`
    }
  }
  const upload = performAssembly(assemblyOptions).catch(err => { console.log(chalk.blue.bold('ERR'), err) })
}

const postProcessingUpdate = async (id) => {
  const ordr = await db.Order.findById(id)
  if (ordr.status === 'initial_processing'){
    ordr.update({ status: 'awaiting_review', refreshToken: true, initProcessCompletedAt: new Date() })
  } else if (ordr.status === 'final_processing'){
    ordr.update({ status: 'approved_completed', refreshToken: true, completedAt: new Date() })
  }
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////// Receivers

const uploadBulkResult = async ({ body }) => {
  if(!transloaditResultValid(body.transloadit, body.signature)){ throw UnauthorizedError() }
  const { template_id, results, fields } = JSON.parse(body.transloadit)
  const { orderId, pilotId } = fields
  let defaultSet = false
  const resultSet = template_id === 'e6b66e500f3c11e8aa615b9c41212186' ? { photo: results.photo } : results
  Object.keys(resultSet).forEach(assemblyResultsName => {
    resultSet[assemblyResultsName].map( async (aR) => {
      const awsId = getAwsKeyFromUrl(aR.ssl_url)
      const name= getNameFromUrl(aR.ssl_url)
      const wmRegex = /_wm/
      const watermarked = wmRegex.test(assemblyResultsName)
      await db.Asset.create({ assetableId: orderId, assetable: 'order',
        default: aR.type === "image" && !defaultSet ? true : false,
        assetableName: assemblyResultsName, url: aR.ssl_url, uploaderId: pilotId,
        ext: aR.ext, type: aR.type, mime: aR.mime, size: aR.size, meta: aR.meta,
        name, awsId, watermarked })
      if(aR.type === "image"){ defaultSet = true }
  }) })
  postProcessingUpdate(orderId)
}

async function uploadResult({ body }, model, uploadName){
  if(!transloaditResultValid(body.transloadit, body.signature)){ throw UnauthorizedError() }
  const { results, fields } = JSON.parse(body.transloadit)
  const { ssl_url, ext, type, mime, size, meta } = results[uploadName][0]
  const awsId = getAwsKeyFromUrl(ssl_url)
  const name = getNameFromUrl(ssl_url)
  const uploaded = await db.Asset.create({ assetableId: fields.uploadToId, assetable: model,
    assetableName: fields.instanceOf, url: ssl_url, ext, type, mime, size, active: true,
    meta, name, awsId, uploaderId: fields.uploaderId || fields.uploadToId }).catch(err => { throw err })
  const toggle = await toggleDefault({ defaultId: uploaded.id, assetableId: fields.uploadToId, assetable: model,
    assetableName: fields.instanceOf })
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
///// Utils

function uploadFile(file, opts){
  transloadit.addStream(`upload`, file)
  return new Promise((resolve,reject) => {
    return transloadit.createAssembly(opts, (err, res) => {
      if (err) { console.log(chalk.blue.bold('transloadit.createAssembly - 224'), err) }
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

function clearS3Contents({ attrs }){
  console.log(chalk.blue.bold('attrs', attrs))
  const listPromise = s3.listObjects({ Bucket: 'homefilming', Prefix: `${env}orders/${ attrs.order.id }/` }).promise()
  listPromise.then(res => {
    console.log(chalk.blue.bold('folderOBJ', res))
    const keys = []
    res.Contents.map(obj => {
      keys.push({ Key: obj.Key })
    })
    const deleteParams = { Bucket: "homefilming", Delete: { Objects: keys } }
    const deletePromise = s3.deleteObjects(deleteParams).promise()
    deletePromise.then(resp => { console.log(chalk.blue.bold('folderRES', resp)) })
  })
  return { attrs }
}

function clearOrderAssets({ attrs }){
  db.Asset.destroy({ where: { assetable: 'order', assetableId: attrs.order.id } })
  return { attrs }
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

function formatContactInfo({ content, type }, { humanized, formatter }){
  if(type === "email"){ return content }
  else if(type === "phone"){ return formatter(content) }
  else { return `${humanized} :: ${content}` }
}

function getAwsKeyFromUrl(url){
  const start = url.lastIndexOf('.com/')
  return url.substring(start+5)
}

function getNameFromUrl(url){
  const start = url.lastIndexOf('/')
  return url.substring(start+1)
}

function transloaditResultValid(transloaditData, signature){
  const calcSignature = Crypto
    .createHmac('sha1', process.env.TRANSLOADIT_SECRET_KEY)
    .update(Buffer.from(transloaditData, 'utf-8'))
    .digest('hex')
  if (calcSignature === signature) {
    return true
  } else {
    return false
  }
}

module.exports = {
  assets,
  avatarUploader,
  logoUploader,
  insuranceUploader,
  licenseUploader,
  processVideoInitPhotos,
  clearOrderAssets,
  clearS3Contents,
  processPhotos,
  uploadResult,
  uploadBulkResult,
  buildOrderOverlay,
  toggleActive,
  toggleDefault,
  destroy
}
