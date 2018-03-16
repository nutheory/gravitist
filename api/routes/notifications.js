const express = require('express')
const router = express.Router()
const { processVideoInitPhotos, uploadResult,
        uploadBulkResult } = require('../services/assets')

router.post('/avatar', async (req, res, next) => {
  const result = await uploadResult(req, "user", "avatar")
    .catch(err => { throw err })
  res.sendStatus(200)
})

router.post('/logo', async (req, res, next) => {
  const result = await uploadResult(req, "company", "logo")
    .catch(err => { throw err })
  res.sendStatus(200)
})

router.post('/insurance', async (req, res, next) => {
  const result = await uploadResult(req, "user", "document")
    .catch(err => { throw err })
  res.sendStatus(200)
})

router.post('/license', async (req, res, next) => {
  const result = await uploadResult(req, "user", "document")
    .catch(err => { throw err })
  res.sendStatus(200)
})

router.post('/overlay', async (req, res, next) => {
  const result = await processVideoInitPhotos(req)
  res.sendStatus(200)
})

router.post('/process-video', async (req, res, next) => {
  const result = await uploadBulkResult(req).catch(err => { throw err })
  res.sendStatus(200)
})

router.post('/process-photos', async (req, res, next) => {
  const result = await uploadBulkResult(req).catch(err => { throw err })
  res.sendStatus(200)
})

module.exports = router
