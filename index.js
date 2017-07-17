require('dotenv').config()
const app = require('./server/server')

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'))
})
