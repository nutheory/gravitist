const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const pug = require('pug')
const pilotRegistrationTemplate = pug.compileFile(__dirname + '/views/pilot_registration.pug')
const isProduction = process.env.NODE_ENV === 'production'
const toMail = (address) => isProduction ? address : 'drush@nutheory.com'
const chalk = require('chalk')

const pilotRegistrationMailer = ({ user }) => {
  const msg = {
    to: toMail(user.email),
    from: 'noreply@homefilming.com',
    subject: `Welcome to Homefilming`,
    text: `Welcome to Homefilming`,
    html: pilotRegistrationTemplate({
      title: `Welcome to Homefilming`,
      name: user.name
    }),
  }
  sgMail.send(msg)
}

const forgotPasswordMailer = ({ user, order }) => {

  const msg4 = {
    to: 'noreply@homefilming.com',
    from: 'noreply@homefilming.com',
    subject: 'New filming opportunity in your area',
    text: `and easy to do anywhere, even with Node.js`,
    html: `and easy to do anywhere, even with Node.js`,
  }
  const res = sgMail.send(msg4)

}

module.exports = {
  pilotRegistrationMailer
}
