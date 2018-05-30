const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_TOKEN
const client = require('twilio')(accountSid, authToken)

const newMissionAlert = ({ ordr, err }) =>
  client.messages
    .create({
       body: `There was a problem transpiling Order ${ordr.id}. Please log in and address this.`,
       from: '+12138949982',
       to: '+19492808977'
     })
    .then(message => console.log(message.sid))
    .done()

module.exports = { transpilingErrorAlert }
