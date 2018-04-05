const stripe = require("stripe")(process.env[`STRIPE_SECRET_KEY`])
const chalk = require('chalk')

async function createStripeCharge({ pln, amountPaid, customer }){
  return await stripe.charges.create({
    amount: amountPaid,
    customer: customer,
    currency: "usd",
    description: pln.name
  }).then(res => { return res }, err => { throw err })
}

async function createStripeCustomer(customerInput, stripeToken){
  return await stripe.customers.create({
    email: customerInput.email,
    description: `Customer for ${customerInput.email}`,
    source: stripeToken
  }).then(res => { return res }, err => { throw err })
}

async function getStripeCustomer(customerId){
  return await stripe.customers.retrieve(customerId).then(customer => {
    return { customer }
  }, err => { throw err })
}

async function createStripeSource(customerId, stripeToken){
  return await stripe.customers.createSource(customerId, { source: stripeToken }).then(async (res) => {
    return await stripe.customers.update(customerId, { default_source: res.id }).then(customer => {
      return { customer }
    }, err => { throw err })
  }, err => { throw err })
}

async function setDefaultStripeSource(customerId, sourceId){
  return await stripe.customers.update(customerId, { default_source: sourceId }).then(customer => {
    return { customer }
  }, err => { throw err })
}

async function destroyStripeSource(customerId, cardId){
  return await stripe.customers.deleteCard(customerId, cardId).then(card => {
    if (card.deleted == true) { return card }
  }, err => { throw err })
}

async function createStripeTransfer({ accountId, transferAmount, orderId, pilotId }){
  return await stripe.transfers.create({
    amount: transferAmount,
    currency: "usd",
    destination: accountId,
    metadata: {
      orderId,
      pilotId
    }
  }).then(payout => {
    console.log(chalk.blue.bold('PAYOUT'), payout)
    return payout
  }, err => {
    console.log(chalk.blue.bold('ERR'), err)
  })
}

module.exports = {
  createStripeCharge,
  createStripeCustomer,
  getStripeCustomer,
  createStripeSource,
  setDefaultStripeSource,
  createStripeTransfer,
  destroyStripeSource
}
