const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const pug = require('pug')
const Moment = require('moment')
const isProduction = process.env.NODE_ENV === 'production'
const toMail = (address) => isProduction ? address : 'drush@nutheory.com'
const sendMail = (msg) => process.env.NODE_ENV !== 'test' ? sgMail.send(msg) : null
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
    subject: `Welcome to Gravit.ist`,
    text: `Welcome to Gravit.ist`,
    html: confirmationTemplate({
      title: `Welcome to Gravit.ist`,
      name: user.name,
      plan: order.plan,
      createdAt: Moment(Date.parse(order.createdAt)).format('MMM Do YYYY, h:mma'),
      status: order.status,
      receiptId: order.receiptId,
      baseUrl: process.env.BASE_URL
    }),
  }
  sendMail(msg)
}

const confirmationMailer = ({ order, user }) => {
  const msg = {
    to: toMail(user.email),
    from: 'noreply@gravit.ist',
    subject: `Thank you for your order at Gravit.ist`,
    text: `Thank you for your order at Gravit.ist`,
    html: confirmationTemplate({
      title: `Thank you for your order at Gravit.ist`,
      name: user.name,
      plan: order.plan,
      createdAt: Moment(Date.parse(order.createdAt)).format('MMM Do YYYY, h:mma'),
      status: order.status,
      receiptId: order.receiptId,
      baseUrl: process.env.BASE_URL
    }),
  }
  sgMail.send(msg)
}

const recruitingMailer = ({ pilot, order }) => {
  console.log(chalk.blue.bold('PILOT'), pilot)
  console.log(chalk.blue.bold('ORDER'), order)
  const msg = {
    to: toMail(pilot.email),
    from: 'noreply@gravit.ist',
    subject: 'New filming opportunity in your area',
    text: `Earn some extra cash by accepting this opportunity to film a
      awesome piece of real estate. Just click the link below to
      take ownership of this mission. And don't forget you must be able
      to fly within 48hrs. Visit https://gravit.ist`,
    html: recruitingTemplate({
      title: `Recruiting ${pilot.name}`,
      name: pilot.name,
      bounty: `${pilot.distanceFromLocation}`,
      distance: `${pilot.distanceFromLocation}`,
      address: order.address.address1,
      cityState: `${order.address.city}, ${order.address.state}`,
      orderId: order.id,
      agentId: order.agent.id,
      baseUrl: process.env.BASE_URL
    }),
  }
  // sgMail.send(msg)
}

const completedMailer = ({ pilot, order }) => {

  const msg = {
    to: toMail(pilot.email),
    from: 'noreply@gravit.ist',
    subject: 'New filming opportunity in your area',
    text: ``,
    html: ``,
  }
  sendMail(msg)
}

const sendRejectedMailer = ({ attrs }) => {
  const msg = {
    to: 'drush@nutheory.com',
    from: 'noreply@gravit.ist',
    subject: 'Rejected',
    text: ``,
    html: ``,
  }
  sendMail(msg)
}

module.exports = {
  welcomeConfirmationMailer,
  confirmationMailer,
  recruitingMailer,
  completedMailer,
  sendRejectedMailer
}
