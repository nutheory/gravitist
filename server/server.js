const express = require('express')
const graphQLHTTP = require('express-graphql'
const jwt = require('express-jwt')
const bodyParser = require('body-parser')
const path = require('path')
const corsPrefetch = require('cors-prefetch-middleware')
const imagesUpload = require('images-upload-middleware')
const morgan = require('morgan')
const models = require('./models')
const schema = require('./graphql/schema')
const config = require('./config')
// const passportConfig = require('./services/auth')
var app = express()
const router = express.Router()

app.set('port', (process.env.PORT || 5000))
app.set('is_dev', (app.settings.env === 'development'))
app.use(bodyParser.json())
// app.use(corsPrefetch)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(express.static(path.resolve() + '/dist/'))
app.use('/graphql', jwt({
  secret: config.jwt.secret,
  requestProperty: 'auth',
  credentialsRequired: false,
}))
app.use('/graphql', function(req, res, done) {
  console.log('req.auth', req.auth)
  console.log('req.input', req.input)
  console.log('req.authorization', req.authorization)
  if (req.auth && req.auth.sub){
    const user = JSON.parse(req.auth.sub)
    req.context = {
      user: user,
    }
  }
  console.log('req.context', req.context)
  done()
});
app.use('/graphql', graphQLHTTP(req => ({
    schema,
    context: req.context,
    graphiql: true
  })
));
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
