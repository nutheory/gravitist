const express = require('express')
const router = express.Router()
const { gallery } = require('../services/orders')

router.get('/:uuid', async (req, res) => {
  const order = await gallery(req.params)
  const agent = order.gallery.agent
  const listing = order.gallery.listing
  const address = order.gallery.address
  const contacts = order.gallery.agent.contacts
  const defaultAsset = order.gallery.galleryAssets.filter(gal => gal.default === true)[0]
  const env = process.env.NODE_ENV === 'development' ? 'development' : ''
  const assetUrl = `${ process.env.ASSET_BASE }${env}/orders/${ order.gallery.id }/`
  const pageUrl = `${ process.env.BASE_URL }/gallery/${ order.gallery.uuid }`
  const photos = order.gallery.galleryAssets.filter(gal => gal.assetableName === 'photo')
  const video = order.gallery.galleryAssets.filter(gal => gal.assetableName === 'video_og')[0]
  res.render('gallery', { id: order.gallery.id, uuid: order.gallery.uuid, pageUrl,
    photos, video, listing, address, agent, contacts, assetUrl, defaultAsset })
})

module.exports = router
