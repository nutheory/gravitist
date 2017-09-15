require('dotenv').config()
const { intStart } = require('./utils/integration_server')

let server

const Init = async () => {
  return intStart().then(s => {
    server = s
  })
}

Init()
