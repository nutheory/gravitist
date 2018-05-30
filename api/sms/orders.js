const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_TOKEN
const client = require('twilio')(accountSid, authToken)
const { getEnvSendValue } = require('../utils/helpers')

const completedAlert = ({ usr, ordr }) => {
  const phoneNumber = usr.contacts.filter(contact => contact.type === 'phone')[0]
  if(phoneNumber && usr.smsNotifications){
    client.messages
      .create({
         body: `There was a problem transpiling Order ${ordr.id}. Please log in and address this.`,
         from: '+12138949982',
         to: getEnvSendValue('sms', usr.)
       })
      .then(message => console.log(message.sid))
      .done()
  }
}

module.exports = { completedAlert }
