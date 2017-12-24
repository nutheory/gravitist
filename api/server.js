const express = require('express')
const graphqlHTTP = require('express-graphql')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const logger = require('morgan')
const passport = require('passport')
const { tokenAuthenticate,
        publicPassThrough } = require('./middleware')
const { avatarUploader,
        logoUploader,
        insuranceUploader,
        licenseUploader,
        pilotOrderUploader,
        pilotOrderUploadResult,
        uploadResult } = require('./services/assets')
const config = require('./config')
const multer = require('multer')
const upload = multer({ limits: { fileSize: 52428800 }})
const Auth = require('./services/auth')
const schema = require('./graphql/schema')

const secret = config.jwt.secret

function serverStart(done){
  app = express()
  // app.use(opbeat.middleware.express())
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cors())
  app.use(logger(':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'))
  app.use(express.static(path.resolve() + '/dist/'))
  app.use(passport.initialize())
  app.use(function(err, req, res, next) {
    console.error(err)
    return res.status(422).json({ errors: err })
  })

  app.use('/graphql',
    tokenAuthenticate,
    publicPassThrough,
    graphqlHTTP(async (req, res, graphQLParams) => ({
      schema
    }))
  )

  app.post('/avatar-uploader', tokenAuthenticate, publicPassThrough, upload.single('avatar'), async (req, res, next) => {
    const upload = await avatarUploader(req).catch(err => { throw err })
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(upload))
  })

  app.post('/avatar-notify-url', async (req, res, next) => {
    const result = await uploadResult(req, "user", "avatar")
      .catch(err => { throw err })
  })

  app.post('/logo-uploader', tokenAuthenticate, publicPassThrough, upload.single('logo'), async (req, res, next) => {
    const upload = await logoUploader(req).catch(err => { throw err })
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(upload))
  })

  app.post('/logo-notify-url', async (req, res, next) => {
    const result = await uploadResult(req, "logo")
      .catch(err => { throw err })
  })

  app.post('/insurance-uploader', tokenAuthenticate, publicPassThrough, upload.single('insurance'), async (req, res, next) => {
    const upload = await  insuranceUploader(req)
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(upload))
  })

  app.post('/insurance-notify-url', async (req, res, next) => {
    const result = await uploadResult(req, "insurance")
      .catch(err => { throw err })
  })

  app.post('/license-uploader', tokenAuthenticate, publicPassThrough, upload.single('license'), async (req, res, next) => {
    const upload = await licenseUploader(req)
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(upload))
  })

  app.post('/license-notify-url', async (req, res, next) => {
    const result = await uploadResult(req, "license")
      .catch(err => { throw err })
  })

  app.post('/pilot-order-uploader', tokenAuthenticate, publicPassThrough, upload.array('assets', 40), async (req, res, next) => {
    const uploads = await pilotOrderUploader(req).catch(err => { throw err })
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(uploads))
  })

  app.post('/pilot-order-notify-url', async (req, res, next) => {
    const result = await pilotOrderUploadResult(req)
      .catch(err => { throw err })
  })

  app.get('*', (req, res) => {
    res.sendFile(path.resolve() + '/dist/index.html')
  })

  return new Promise(resolve => {
    const server = app.listen(process.env.PORT || 5000, () => {
      console.log(`Listening on port ${server.address().port}`)
      resolve(server)
    })
  })
}

module.exports = { serverStart }
