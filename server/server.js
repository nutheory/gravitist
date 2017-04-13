import express from 'express'
import graphQLHTTP from 'express-graphql'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import morgan from 'morgan'
import models from './models'
import schema from './schema'
import config from './config'
import passportConfig from './services/auth'
import webpackMiddleware from 'webpack-dev-middleware'
import webpack from 'webpack'
import webpackConfig from '../webpack.config.js'
const app = express()
const router = express.Router()

app.set('port', (process.env.PORT || 5000))
app.set('is_dev', (app.settings.env === 'development'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(passport.initialize())
app.use(express.static(__dirname + '/dist'))
app.use('/graphql', graphQLHTTP({ schema, graphiql: true }))
app.use(webpackMiddleware(webpack(webpackConfig)))

app.get('*', (req, res) => {
  res.sendfile('./dist/index.html')
})

export default app
