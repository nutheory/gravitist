const express = require('express')
const graphQLHTTP = require('express-graphql')
// const {graphqlExpress, graphiqlExpress} = require('graphql-server-express')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const corsPrefetch = require('cors-prefetch-middleware')
// const {apolloUploadExpress} = require('apollo-upload-server')
// const imagesUpload = require('images-upload-middleware')
const session = require('express-session')
const passport = require('passport')
const morgan = require('morgan')
const multer  = require('multer')
const models = require('./models')
const schema = require('./graphql/schema')
const config = require('./config')
const passportConfig = require('./services/auth')
var app = express()
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router()

app.set('port', (process.env.PORT || 5000))
app.set('is_dev', (app.settings.env === 'development'))
app.use(cookieParser())
app.use(bodyParser.json())
// app.use(corsPrefetch())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(express.static(path.resolve() + '/dist/'))
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized:true}))
app.use(passport.initialize())
app.use(passport.session())


app.use('/graphql', graphQLHTTP(req => ({
    schema,
    graphiql: true,
  })
))

app.post('/asset-uploads', upload.array('assets'), (req, res) => {
  console.log('REQQQQQ',req.body.file)
})


if (app.get('is_dev')) {
  const webpackMiddleware = require('webpack-dev-middleware')
  const webpack = require('webpack')
  const webpackConfig = require('../webpack.config.js')
  app.use(webpackMiddleware(webpack(webpackConfig)))
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve() + '/dist/index.html')
})

module.exports = app
