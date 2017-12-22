const Payments = require('../resolverMethods/payments')
const { gQL, gQLget, gQLpost, responseFactory, LogIn } = require('../utils/helpers')
const _ = require('lodash')
const Faker = require('faker')
const chalk = require('chalk')


describe('stripe payment mutations and queries', () => {

  let agent, agentSnapshot

  beforeAll( async () => {
    agent = await LogIn.agent()
    gQL.defaults.headers.common.authorization = agent.loginUser.auth.token
    agentSnapshot = agent.loginUser.user
  })

  afterAll( async () => {
    gQL.defaults.headers.common.authorization = ''
  })

  test(chalk.green.bold('it should get stripe customer data'), async () => {
    const customer = await Payments.getCustomer({ input: { id: agentSnapshot.id,
      authorizedId: agentSnapshot.id, customerId: agentSnapshot.customerId } })
    expect(customer.status).toEqual(200)
    expect(customer.getCustomer.customer).toHaveProperty( 'email', agentSnapshot.email )
    expect(customer.getCustomer.customer).toHaveProperty('default_source', expect.any(String))
    expect(customer.getCustomer.customer.sources.data[0]).toHaveProperty('brand', 'Visa')
    expect(customer.getCustomer.customer.sources.data[0]).toHaveProperty('last4', '4242')
  })

  test(chalk.green.bold('it should toggle the default source'), async () => {
    const attr = { input: { authorizedId: agentSnapshot.id, customerId: agentSnapshot.customerId, token: 'tok_mastercard' } }
    const newSource = await Payments.createSource(attr)
    const oCustomer = newSource.createSource.customer
    const defaultCard = _.find(oCustomer.sources.data, function(card) { return card.id === oCustomer.default_source })
    const swichToCard = _.find(oCustomer.sources.data, function(card) { return card.id != oCustomer.default_source })
    expect(defaultCard).toHaveProperty('brand', 'MasterCard')
    const changeSource = { input: { authorizedId: agentSnapshot.id, customerId: oCustomer.id,
      sourceId: swichToCard.id } }
    const newDefault = await Payments.setDefaultSource(changeSource)
    const nCustomer = newDefault.setDefaultSource.customer
    const newDefaultCard = _.find(nCustomer.sources.data, function(card) { return card.id === nCustomer.default_source })
    expect(newDefaultCard).toHaveProperty('brand', 'Visa')
    // ----- Clean Up
    const destroySourceCreated = { input: { authorizedId: agentSnapshot.id, customerId: oCustomer.id,
      cardId: defaultCard.id } }
    const src = await Payments.destroySource(destroySourceCreated)
  })

  test(chalk.green.bold('it should create a new source with a card/token'), async () => {
    const attr = { input: { authorizedId: agentSnapshot.id, customerId: agentSnapshot.customerId, token: 'tok_mastercard' } }
    const newSource = await Payments.createSource(attr)
    const customer = newSource.createSource.customer
    expect(newSource.status).toEqual(200)
    expect(customer).toHaveProperty('default_source', expect.any(String))
    expect(customer.sources.data[0]).toHaveProperty('brand', 'MasterCard')
    // ----- Clean Up
    const destroySourceCreated = { input: { authorizedId: agentSnapshot.id, customerId: customer.id,
      cardId: customer.sources.data[0].id } }
    const src = await Payments.destroySource(destroySourceCreated)
    expect(src.destroySource).toHaveProperty('id', expect.any(String))
  })

  test(chalk.green.bold('it should destroy a card'), async () => {
    const attr = { input: { authorizedId: agentSnapshot.id, customerId: agentSnapshot.customerId, token: 'tok_visa' } }
    const newSource = await Payments.createSource(attr)
    const customer = newSource.createSource.customer
    const destroySourceCreated = { input: { authorizedId: agentSnapshot.id, customerId: customer.id,
      cardId: customer.sources.data[0].id } }
    const destroyed = await Payments.destroySource(destroySourceCreated)
    expect(destroyed.status).toEqual(200)
    expect(destroyed.destroySource.id).toEqual(expect.any(String))
  })

})
