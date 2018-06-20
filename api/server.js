const express = require('express')
const graphqlHTTP = require('express-graphql')
// const enforce = require('express-sslify')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const logger = require('morgan')
const crypto = require('crypto')
const passport = require('passport')
const { tokenAuthenticate, publicPassThrough,
        hmac, hexhmac } = require('./middleware')
const Auth = require('./services/auth')
const schema = require('./graphql/schema')
const { formatError } = require('./utils/appErrors')
const notificationRouter = require('./routes/notifications')
const uploadRouter = require('./routes/uploads')
const galleryRouter = require('./routes/gallery')
const authRouter = require('./routes/auth')
const app = express()


function serverStart(done){
  // app.use(opbeat.middleware.express())
  // process.env.NODE_ENV === 'production' ? app.use(enforce.HTTPS({ trustProtoHeader: true })) : null
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ limit: '1mb', extended: false }))
  app.use(bodyParser.json({limit: '1mb'}))
  app.use(cors({ origin: '*', credentials: true }))
  app.use(logger(':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'))
  app.use(express.static(path.resolve() + '/dist/'))
  app.set('views', path.resolve() + '/client/views/')
  app.set('view engine', 'pug')
  app.use(passport.initialize())
  app.use(function(err, req, res, next) {
    console.error(err)
    console.log(req)
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

  app.use( '/notifications', notificationRouter )
  app.use( '/uploads', tokenAuthenticate, publicPassThrough, uploadRouter )
  app.use( '/gallery', galleryRouter )
  app.use( '/auth', authRouter )

  app.get('/auth-signature', tokenAuthenticate, publicPassThrough, async (req, res, next) => {
    if(req.user && req.user.type === "agent"){ res.sendStatus(200) }
    const timestamp = req.query.datetime.substr(0, 8)
    const date = hmac('AWS4' + process.env.AWS_SECRET_ACCESS_KEY, timestamp)
    const region = hmac(date, 'us-west-1')
    const service = hmac(region, 's3')
    const signing = hmac(service, 'aws4_request')
    res.status(200).send(hexhmac(signing, req.query.to_sign))
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
