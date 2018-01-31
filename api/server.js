const express = require('express')
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
        buildPresignedRequest,
        finalProcessing,
        uploadResult } = require('./services/assets')
const { update } = require('./services/users')
const config = require('./config')
const multer = require('multer')
const Auth = require('./services/auth')
const schema = require('./graphql/schema')
const axios = require('axios')
const { formatError } = require('./utils/appErrors')
const secret = config.jwt.secret
const stripeSecret = config.stripe[process.env.NODE_ENV].secret_key
const upload = multer({ limits: { fileSize: 52428800 }})
const chalk = require('chalk')

function serverStart(done){
  app = express()
  // app.use(opbeat.middleware.express())
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ limit: '1mb', extended: false }))
  app.use(bodyParser.json({limit: '1mb'}))
  app.use(cors({ origin: 'http://localhost:5000', credentials: true }))
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
      schema,
      formatError
    }))
  )

  app.get('/signup-pilot', async (req, res, next) => {
    console.log('req.params', req.query)
    axios.post('https://connect.stripe.com/oauth/token', {
      client_secret: stripeSecret,
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

  app.post('/avatar-uploader', tokenAuthenticate, publicPassThrough, upload.single('avatar'), async (req, res, next) => {
    console.log('REQ', req.user)
    const upload = await avatarUploader(req).catch(err => { throw err })

    res.setHeader('Content-Type', 'application/json')
    res.sendStatus(200)
  })

  app.post('/avatar-notify-url', async (req, res, next) => {
    const result = await uploadResult(req, "user", "avatar")
      .catch(err => { throw err })
    res.sendStatus(200)
  })

  app.post('/logo-uploader', tokenAuthenticate, publicPassThrough, upload.single('logo'), async (req, res, next) => {
    const upload = await logoUploader(req).catch(err => { throw err })
    res.setHeader('Content-Type', 'application/json')
    res.sendStatus(200)
  })

  app.post('/logo-notify-url', async (req, res, next) => {
    const result = await uploadResult(req, "company", "logo")
      .catch(err => { throw err })
    res.sendStatus(200)
  })

  app.post('/insurance-uploader', tokenAuthenticate, publicPassThrough, upload.single('insurance'), async (req, res, next) => {
    const upload = await insuranceUploader(req)
    res.setHeader('Content-Type', 'application/json')
    res.sendStatus(200)
  })

  app.post('/insurance-notify-url', async (req, res, next) => {
    const result = await uploadResult(req, "user", "insurance")
      .catch(err => { throw err })
    res.sendStatus(200)
  })

  app.post('/license-uploader', tokenAuthenticate, publicPassThrough, upload.single('license'), async (req, res, next) => {
    const upload = await licenseUploader(req)
    res.setHeader('Content-Type', 'application/json')
    res.sendStatus(200)
  })

  app.post('/license-notify-url', async (req, res, next) => {
    const result = await uploadResult(req, "user", "license")
      .catch(err => { throw err })
    res.sendStatus(200)
  })

  app.get('/auth-signature', tokenAuthenticate, publicPassThrough, async (req, res, next) => {
    if(req.user && req.user.type === "agent"){ res.sendStatus(200) }
    const timestamp = req.query.datetime.substr(0, 8)
    const date = hmac('AWS4' + config.aws.secretAccessKey, timestamp)
    const region = hmac(date, 'us-west-1')
    const service = hmac(region, 's3')
    const signing = hmac(service, 'aws4_request')
    res.status(200).send(hexhmac(signing, req.query.to_sign))
  })

  app.post('/overlay-notify-url', async (req, res, next) => {
    const result = await finalProcessing(req)
    res.sendStatus(200)
  })

  app.post('/process-notify-url', async (req, res, next) => {
    console.log(chalk.blue.bold('REQ'),req)
    const result = await uploadResult(req, "order", "video")
      .catch(err => { throw err })
    res.sendStatus(200)
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
