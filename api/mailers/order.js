const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const pug = require('pug')
const isProduction = process.env.NODE_ENV === 'production'
const toMail = (address) => isProduction ? address : 'drush@nutheory.com'
const recruitingTemplate = pug.compileFile(__dirname + '/views/recruit_pilots.pug')
const completedTemplate = pug.compileFile(__dirname + '/views/order_completed.pug')
const confirmationTemplate = pug.compileFile(__dirname + '/views/order_confirmation.pug')
const chalk = require('chalk')


const welcomeConfirmationMailer = ({ order, user }) => {
  console.log(chalk.blue.bold('Agent'), user)
  console.log(chalk.blue.bold('ORDER'), order)
  const msg = {
    to: toMail(user.email),
    from: 'noreply@homefilming.com',
    subject: `Welcome to Homefilming`,
    text: `Welcome to Homefilming`,
    html: confirmationTemplate({
      title: `Welcome to Homefilming`,
      name: user.name,
      plan: order.plan,
      createdAt: order.createdAt,
      status: order.status,
      receiptId: order.receiptId
    }),
  }
  sgMail.send(msg)
}

const confirmationMailer = ({ order, user }) => {
  const msg = {
    to: toMail(user.email),
    from: 'noreply@homefilming.com',
    subject: `Thank you for your order at Homefilming`,
    text: `Thank you for your order at Homefilming`,
    html: confirmationTemplate({
      title: `Thank you for your order at Homefilming`,
      name: user.name,
      plan: order.plan,
      createdAt: order.createdAt,
      status: order.status,
      receiptId: order.receiptId
    }),
  }
  sgMail.send(msg)
}

const recruitingMailer = ({ pilot, order }) => {
  console.log(chalk.blue.bold('PILOT'), pilot)
  console.log(chalk.blue.bold('ORDER'), order)
  const msg = {
    to: toMail(pilot.email),
    from: 'noreply@homefilming.com',
    subject: 'New filming opportunity in your area',
    text: `Earn some extra cash by accepting this opportunity to film a
      awesome piece of real estate. Just click the link below to
      take ownership of this mission. And don't forget you must be able
      to fly within 48hrs. Visit https://homefilming.com`,
    html: recruitingTemplate({
      title: `Recruiting ${pilot.name}`,
      name: pilot.name,
      bounty: `${pilot.distanceFromLocation}`,
      distance: `${pilot.distanceFromLocation}`,
      address: order.address.address1,
      cityState: `${order.address.city}, ${order.address.state}`,
      orderId: order.id,
      agentId: order.agent.id
    }),
  }
  // sgMail.send(msg)
}

const completedMailer = ({ pilot, order }) => {

  const msg = {
    to: toMail(pilot.email),
    from: 'noreply@homefilming.com',
    subject: 'New filming opportunity in your area',
    text: ``,
    html: ``,
  }
  sgMail.send(msg)
}

module.exports = {
  welcomeConfirmationMailer,
  confirmationMailer,
  recruitingMailer,
  completedMailer
}
