const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const pug = require('pug')
const isProduction = process.env.NODE_ENV === 'production'
const toMail = (address) => isProduction ? address : 'drush@nutheory.com'
const sendMail = (msg) => process.env.NODE_ENV !== 'test' ? sgMail.send(msg) : null
const pilotRegistrationTemplate = pug.compileFile(__dirname + '/views/pilot_registration.pug')
const passwordResetTemplate = pug.compileFile(__dirname + '/views/password_reset.pug')
const chalk = require('chalk')

const pilotRegistrationMailer = ({ user }) => {
  const msg = {
    to: toMail(user.email),
    from: 'noreply@gravit.ist',
    subject: `Welcome to Gravit.ist`,
    text: `Welcome to Gravit.ist`,
    html: pilotRegistrationTemplate({
      title: `Welcome to Gravit.ist`,
      name: user.name,
      baseUrl: process.env.BASE_URL
    }),
  }
  sendMail(msg)
}

const resetPasswordMailer = ({ user, token }) => {
  const msg = {
    to: toMail(user.email),
    from: 'noreply@gravit.ist',
    subject: 'Gravit.ist reset password',
    text: `Hello,\r\n
    You have requested to reset password for Gravit.ist.
    Open this link to change your password:\r\n

    ${process.env.BASE_URL}/reset-password?token=${token}

    If you have not requested this change, please ignore this email.
    The link is valid for the next 30 minutes and can be used once.`,
    html: passwordResetTemplate({
      user,
      token,
      baseUrl: process.env.BASE_URL
    }),
  }
  sendMail(msg)
}

module.exports = {
  pilotRegistrationMailer,
  resetPasswordMailer
}
