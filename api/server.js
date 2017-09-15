const express = require('express')
const graphQLHTTP = require('express-graphql')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const errorhandler = require('errorhandler')
const passport = require('passport')
const morgan = require('morgan')
const multer  = require('multer')
const schema = require('./graphql/schema')
const config = require('./config')
const passportConfig = require('./services/auth')
const app = express()
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const isDev = app.settings.env === 'development'
const router = express.Router()

function serverStart() {

  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(morgan(':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'))
  app.use(cors())
  if (isDev) { app.use(errorhandler()) }
  app.use(express.static(path.resolve() + '/dist/'))
  app.use(passport.initialize())
  app.use(function(err, req, res, next) {
    console.error(err)
    return res.status(422).json({ errors: err })
  })

  app.use('/graphql',
    (req, res, next) => {
      console.log("checkForToken - reqHeaders",req.headers)
      if (!req.headers.authorization || req.headers.authorization == 'undefined'){return next()}
      console.log("checkForToken - has token")
      passport.authenticate('bearer', (err, user, info) => {
        if (err) return next(err)
        if (user) {
          req.user = user
          return next()
        } else {
          return res.status(401).json({ status: 'error', code: 'unauthorized' })
        }
      })(req, res, next)
    },
    // (req, res, next) => {
    //   console.log("checkForLoginCredentials - req.body.variables", req.body.variables)
    //   console.log("req.body.variables.input", (req.body.variables.input ? true : false))
    //   if (!req.body.variables.input || !req.body.variables.input.password){
    //     console.log("checkForLoginCredentials - IF is TRUE, going to NEXT")
    //     return next()
    //   }
    //   console.log("checkForLoginCredentials - IF is FALSE, passed check")
    //   passport.authenticate('local', function(err, user, info) {
    //     console.log("checkForLoginCredentials - err", err)
    //     console.log("checkForLoginCredentials - user", user)
    //     console.log("checkForLoginCredentials - info", info)
    //     if (err) return next(err)
    //     if (!user) {
    //       return res.status(401).json({ status: 'error', code: 'unauthorized' })
    //     } else {
    //       return res.json({ token: jwt.sign({id: user.id}, secret) })
    //     }
    //   })(req, res, next)
    // },
    // (req, res, next) => {
    //   console.log("passThrough reached - user", req.user)
    //   return next()
    // },
    graphQLHTTP(async (req, res, graphQLParams) => ({
      schema: schema,
      graphiql: true
    }))
  )

  app.post('/asset-uploads', upload.array('assets'), (req, res) => {
    // console.log('REQQQQQ',req.body.file)
  })

  app.get('*', (req, res) => {
    res.sendFile(path.resolve() + '/dist/index.html')
  })

  return new Promise(resolve => {
    const server = app.listen(process.env.PORT || 5000, () => {
      console.log(`Listening on port ${server.address().port}`)
      server.on('close', () => {
        console.log(`Goodbye`)
      })
      resolve(server)
    })
  })

}

module.exports = { serverStart }
