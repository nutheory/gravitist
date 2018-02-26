const express = require('express')
const wwwhisper = require('connect-wwwhisper')
const graphqlHTTP = require('express-graphql')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const logger = require('morgan')
const crypto = require('crypto')
const passport = require('passport')
const { tokenAuthenticate,
        publicPassThrough,
        hmac,
        hexhmac } = require('./middleware')
const { avatarUploader,
        logoUploader,
        insuranceUploader,
        licenseUploader,
        processVideoInitPhotos,
        uploadResult,
        uploadBulkResult } = require('./services/assets')
const { createOrderContact } = require('./services/contacts')
const { update } = require('./services/users')
const { gallery } = require('./services/orders')
const multer = require('multer')
const Auth = require('./services/auth')
const schema = require('./graphql/schema')
const axios = require('axios')
const { formatError } = require('./utils/appErrors')
const upload = multer({ limits: { fileSize: 52428800 }})
const chalk = require('chalk')

function serverStart(done){
  app = express()
  // app.use(opbeat.middleware.express())
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ limit: '1mb', extended: false }))
  app.use(bodyParser.json({limit: '1mb'}))
  app.use(wwwhisper())
  app.use(cors({ origin: 'http://localhost:5000', credentials: true }))
  app.use(logger(':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'))
  app.use(express.static(path.resolve() + '/dist/'))
  app.set('views', path.resolve() + '/client/views/')
  app.set('view engine', 'pug')
  app.use(passport.initialize())
  app.use(function(err, req, res, next) {
    console.error(err)
    return res.status(422).json({ errors: err })
  })

  app.use('/graphql',
    tokenAuthenticate,
    publicPassThrough,
    graphqlHTTP(async (req, res, graphQLParams) => ({
      schema,
      formatError
    }))
  )

  app.get('/signup-pilot', async (req, res, next) => {
    console.log('req.params', req.query)
    axios.post('https://connect.stripe.com/oauth/token', {
      client_secret: process.env[`STRIPE${process.env.NODE_ENV === 'development' ? '_DEV' : ''}_SECRET_KEY`],
      code: req.query.code,
      grant_type: 'authorization_code'
    }).then(async (response) => {
      const upadated = await update({ id: req.query.state, user: { accountId: response.data.stripe_user_id, refreshToken: true }})
      res.redirect('/dashboard')
    })
    .catch(err => {
      // invalid_grant
      console.log(err)
    })
  })

  app.post('/order-contact', async (req, res, next) => {
    console.log(chalk.blue.bold('save contact'), req.body)
    const contact = await createOrderContact({
      contactableId: req.body.orderId,
      contactable: 'order',
      name: req.body.name,
      content: req.body.content })
    res.status(200).json(contact)
  })

  app.post('/avatar-uploader', tokenAuthenticate, publicPassThrough, upload.single('avatar'), async (req, res, next) => {
    console.log(chalk.blue.bold('uploader'))
    const upload = await avatarUploader(req).catch(err => { throw err })
    res.status(200).json(upload)
  })

  app.post('/avatar-notifications', async (req, res, next) => {
    const result = await uploadResult(req, "user", "avatar")
      .catch(err => { throw err })
    console.log(chalk.blue.bold('notifyer avatar'))
    res.sendStatus(200)
  })

  app.post('/logo-uploader', tokenAuthenticate, publicPassThrough, upload.single('logo'), async (req, res, next) => {
    const upload = await logoUploader(req).catch(err => { throw err })
    res.status(200).json(upload)
  })

  app.post('/logo-notifications', async (req, res, next) => {
    const result = await uploadResult(req, "company", "logo")
      .catch(err => { throw err })
    res.sendStatus(200)
  })

  app.post('/insurance-uploader', tokenAuthenticate, publicPassThrough, upload.single('insurance'), async (req, res, next) => {
    const upload = await insuranceUploader(req)
    res.status(200).json(upload)
  })

  app.post('/insurance-notifications', async (req, res, next) => {
    console.log(chalk.blue.bold('notifyer1 insurance'))
    const result = await uploadResult(req, "user", "document")
      .catch(err => { throw err })
    console.log(chalk.blue.bold('notifyer2 insurance'))
    res.sendStatus(200)
  })

  app.post('/license-uploader', tokenAuthenticate, publicPassThrough, upload.single('license'), async (req, res, next) => {
    const upload = await licenseUploader(req)
    res.status(200).json(upload)
  })

  app.post('/license-notifications', async (req, res, next) => {
    console.log(chalk.blue.bold('notifyer1 license'))
    const result = await uploadResult(req, "user", "document")
      .catch(err => { throw err })
    console.log(chalk.blue.bold('notifyer2 license'))
    res.sendStatus(200)
  })

  app.get('/auth-signature', tokenAuthenticate, publicPassThrough, async (req, res, next) => {
    if(req.user && req.user.type === "agent"){ res.sendStatus(200) }
    const timestamp = req.query.datetime.substr(0, 8)
    const date = hmac('AWS4' + process.env.AWS_SECRET_ACCESS_KEY, timestamp)
    const region = hmac(date, 'us-west-1')
    const service = hmac(region, 's3')
    const signing = hmac(service, 'aws4_request')
    res.status(200).send(hexhmac(signing, req.query.to_sign))
  })

  app.post('/overlay-notifications', async (req, res, next) => {
    const result = await processVideoInitPhotos(req)
    res.sendStatus(200)
  })

  app.post('/process-video-notifications', async (req, res, next) => {
    const result = await uploadBulkResult(req).catch(err => { throw err })
    res.sendStatus(200)
  })

  app.post('/process-photos-notifications', async (req, res, next) => {
    const result = await uploadBulkResult(req).catch(err => { throw err })
    res.sendStatus(200)
  })

  app.get('/gallery/:uuid', async (req, res) => {
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

  app.get('*', (req, res) => {
    res.render('index', {})
  })

  return new Promise(resolve => {
    const server = app.listen(process.env.PORT || 5000, () => {
      console.log(`Listening on port ${server.address().port}`)
      resolve(server)
    })
  })
}

module.exports = { serverStart }
