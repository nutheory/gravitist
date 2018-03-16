const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ limits: { fileSize: 52428800 }})
const { avatarUploader, logoUploader,
        insuranceUploader, licenseUploader } = require('../services/assets')

router.post('/avatar', upload.single('avatar'), async (req, res, next) => {
  const upload = await avatarUploader(req).catch(err => { throw err })
  res.status(200).json(upload)
})

router.post('/logo', upload.single('logo'), async (req, res, next) => {
  const upload = await logoUploader(req).catch(err => { throw err })
  res.status(200).json(upload)
})

router.post('/insurance', upload.single('insurance'), async (req, res, next) => {
  const upload = await insuranceUploader(req)
  res.status(200).json(upload)
})

router.post('/license', upload.single('license'), async (req, res, next) => {
  const upload = await licenseUploader(req)
  res.status(200).json(upload)
})

module.exports = router
