import express from 'express'
import graphQLHTTP from 'express-graphql'
import bodyParser from 'body-parser'
import models from './models'
import schema from './config/schema'
const app = express()

app.set('port', (process.env.PORT || 5000))
app.set('is_dev', (app.settings.env === 'development'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/dist'))

if (app.get('is_dev')) { app.use(graphQLHTTP({ schema, graphiql: true })) }

app.get('/', (req, res) => {

})



app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'))
})
