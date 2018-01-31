const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const isProduction = process.env.NODE_ENV === 'production'
const toMail = (address) => isProduction ? address : 'drush@nutheory.com'

const signupMailer = ({ user, order }) => {
  const msg = {
    to: toMail(user.email),
    from: 'noreply@homefilming.com',
    subject: `Thank you for your order at Homefilming`,
    text: ``,
    html: ``,
  }
  sgMail.send(msg)
}

const forgotPasswordMailer = ({ user, order }) => {

  const msg = {
    to: toMail(pilot.email),
    from: 'noreply@homefilming.com',
    subject: 'New filming opportunity in your area',
    text: ``,
    html: ``,
  }
  sgMail.send(msg)
}
