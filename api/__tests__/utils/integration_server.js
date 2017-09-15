const express = require('express')
const graphqlHTTP = require('express-graphql')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const passport = require('passport')
const chalk = require('chalk')
const config = require('../../config')
const Auth = require('../../services/auth')
const schema = require('../../graphql/schema')
const _ = require('lodash')
const secret = config.jwt.secret

function intStart(done, appPort){
  const app = express()
  const PORT = appPort || 9000


  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cors())
  app.use(passport.initialize())
  app.use(function(err, req, res, next) {
    console.error(err)
    return res.status(422).json({ errors: err })
  })

  app.use('/graphql', (req, res, next) => {
      if ( !req.headers.authorization || req.headers.authorization == undefined ){return next()}
      passport.authenticate('bearer', (err, user, info) => {
        // let regEx = new RegExp('createOrder')
        // if (regEx.test(req.body.query)){
        //   console.log('REQ', req)
        // }
        if (err) { return next(err) }
        if (user) {
          req.user = user
        } else {
          return res.status(401).json({ status: 'error', code: 'unauthorized' })
        }
        return next()
      })(req, res, next)
    }, (req, res, next) => {
      let regEx
      let noAuthRequired = false
      const unprotectedMethods = [ 'login', 'createAgent', 'createPilot',
        'createEditor', 'createAdmin', 'createOrderWithUser' ]
      _.each(unprotectedMethods, (method) => {
        regEx = new RegExp(method)
        if (regEx.test(req.body.query)) {
          noAuthRequired = true
        }
      })
      if ( noAuthRequired || req.user ){
        return next()
      }
      return res.status(401).json({ status: 'error', code: 'unauthorized' })
    },
    graphqlHTTP(async (req, res, graphQLParams) => ({
      schema: schema
    }))
  )

  return new Promise(resolve => {
    const server = app.listen(PORT, () => {
      console.log(`Listening on port ${server.address().port}`)
      resolve(server)
    })
  })
}

// async function gQL(queryObj){
//   let result
//   const app = queryObj.server
//   const query = queryObj.query || ""
//   const variables = queryObj.variables || null
//   const method = queryObj.method || "get"
//   const token = queryObj.token || undefined
//
//   console.log("queryObj", queryObj)
//
//   if ( token ) {
//     result = await axios({
//       url: `http://localhost:${app.address().port}/graphql`,
//       method: method,
//       data: { query, variables },
//       headers: { 'authorization': token }
//     })
//   } else {
//     result = await axios({
//       url: `http://localhost:${app.address().port}/graphql`,
//       method: method,
//       data: { query, variables }
//     })
//   }
//   console.log("QL", result)
//   return result
// }

module.exports = { intStart }
