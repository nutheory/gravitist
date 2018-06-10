const express = require('express')
const router = express.Router()
const { gallery } = require('../services/orders')
const { getAsset } = require('../services/assets')
const env = process.env.NODE_ENV === 'development' ? 'development' : ''
const chalk = require('chalk')

router.get('/:uuid', async (req, res) => {
  const order = await gallery(req.params)
  const agent = order.gallery.agent
  const listing = order.gallery.listing
  const address = order.gallery.address
  const contacts = order.gallery.agent.contacts
  const defaultAsset = order.gallery.photos.filter(gal => gal.default === true)[0]
  const assetUrl = `${ process.env.ASSET_BASE }/${env}/orders/${ order.gallery.id }/`
  const pageUrl = `${ process.env.BASE_URL }/gallery/${ order.gallery.uuid }`
  const photos = order.gallery.photos
  const video = order.gallery.video
  res.render('gallery', { id: order.gallery.id, uuid: order.gallery.uuid, pageUrl,
    photos, video, listing, address, agent, contacts, assetUrl, defaultAsset })
})

router.get('/order/:orderId/asset/:wm/:name', async (req, res) => {
  const asset = await getAsset(req.params)
  console.log(chalk.blue.bold('ASSET'), asset)
  const agent = asset.order.agent
  const listing = asset.order.listing
  const address = asset.order.address
  const contacts = asset.order.agent.contacts
  const assetUrl = `${ process.env.ASSET_BASE }/${env}/orders/${ asset.order.id }/`
  const pageUrl = `${process.env.BASE_URL}/gallery/order/${ asset.order.id }/asset/${asset.id}`
  res.render('single_asset', { asset, orderId: asset.order.id, uuid: asset.order.uuid, pageUrl,
    listing, address, agent, contacts, assetUrl })
})

module.exports = router
