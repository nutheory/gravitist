// const { serverStart } = require('../../server')
const Users = require('../resolverMethods/users')
const { randSix, gQL, gQLget, gQLpost, generateUserData, generateAddressData,
  cleanUpTestItem, responseFactory, LogIn } = require('../utils/helpers')
const { silveradoHighSchool, missionViejoMall, longBeachAirport,
   sanDiegoInternationalAirport } = require('./addresses')
const _ = require('lodash')
const Faker = require('faker')
const chalk = require('chalk')

describe('creating users with types', () => {

  test(chalk.green.bold('it should create a agent'), async () => {
    const attr = { stripeToken: "tok_visa" }
    const email = `drush81+agent${randSix()}@gmail.com`
    const agent = await Users.createNewUser( "Agent", attr, { email } )
    expect(agent.result.status).toEqual(200)
    expect(agent.result[`createAgent`].user).toHaveProperty( 'type', 'agent' )
    const clean = agent.cleanUpUser
    return clean()
  })

  test(chalk.green.bold('it should create a pilot'), async () => {
    const address = await generateAddressData()
    const email = `drush81+pilot${randSix()}@gmail.com`
    const attr = { stripeToken: "tok_visa", workRadius: 50, address: missionViejoMall,
      contacts: [{ content: "nutheory", type: "slack" }, { content: "(949) 555-5555", type: "phone" }]}
    const pilot = await Users.createNewUser( "Pilot", attr, { email } )
    expect(pilot.result.status).toEqual(200)
    expect(pilot.result["createPilot"].user).toHaveProperty('type', 'pilot')
    expect(pilot.result["createPilot"].user.address).toHaveProperty('zipCode', expect.any(String))
    const clean = pilot.cleanUpUser
    return clean()
  })


  test(chalk.green.bold('it should create a admin'), async () => {
    const attr = { type: 'unapproved_admin',
      contacts: [{ content: "nutheory", type: "slack" }, { content: "(949) 555-5555", type: "phone" }] }
    const email = `drush81+admin${randSix()}@gmail.com`
    const admin = await Users.createNewUser("User", attr, { email } )
    expect(admin.result.status).toEqual(200)
    expect(admin.result["createUser"].user).toHaveProperty('type', 'unapproved_admin')
    const clean = admin.cleanUpUser
    return clean()
  })

  test(chalk.green.bold('it should fail to create a agent with UniqueEmailError'), async () => {
    const attr = { stripeToken: "tok_visa" }
    const email = `drush81+agent@gmail.com`
    const agent = await Users.createNewUser( "Agent", attr, { email } )
    expect(agent.result.status).toEqual(200)
    expect(agent.result.data.errors[0]).toHaveProperty('message', expect.stringContaining('unique constraint') )
  })

  // test(chalk.green.bold('it should fail to create a agent with RequiredFieldsError'), async () => {
  //   const attr = { }
  //   const email = `drush81+agent${randSix()}@gmail.com`
  //   const agent = await Users.createNewUser( "Agent", attr, { email } )
  //   expect(agent.result.status).toEqual(200)
  //   expect(agent.result.data.errors[0]).toHaveProperty('message', expect.stringContaining('unique constraint') )
  // })

  test(chalk.green.bold('it should delete the current user'), async () => {
    const attr = { stripeToken: "tok_visa" }
    const email = `drush81+deleteMe${randSix()}@gmail.com`
    const agent = await Users.createNewUser("Agent", attr, { email } )
    expect(agent.result.status).toEqual(200)
    gQL.defaults.headers.common.authorization = agent.result.createAgent.auth.token
    const id = agent.result.createAgent.user.id
    const deleted = await Users.destroyUser( { input: { id: id, authorizedId: id } } )
    console.log(chalk.blue.bold('deleted.destroyUser'), deleted.data)
    console.log(chalk.blue.bold('agent.result.createAgent.user.name'), agent.result.createAgent.user.name)
    expect(deleted.status).toEqual(200)
    expect(deleted.destroyUser.user.name).toEqual(agent.result.createAgent.user.name)
    gQL.defaults.headers.common.authorization = ''
  })

})

describe('perform tasks as authenticated user', () => {

  let agent, agentSnapshot

  beforeAll( async () => {
    agent = await LogIn.agent()
    gQL.defaults.headers.common.authorization = agent.loginUser.auth.token
    agentSnapshot = agent.loginUser.user
  })

  afterAll( async () => {
    gQL.defaults.headers.common.authorization = ''
  })

  test(chalk.green.bold('it should get a users profile'), async () => {
    const user = await Users.getProfile({ input: { id: agentSnapshot.id, authorizedId: agentSnapshot.id } })
    expect(user.status).toEqual(200)
    expect(user.getUser.user.name).toEqual('Derek Rush')
    expect(user.getUser.user.address).toHaveProperty( 'zipCode' )
  })

  test(chalk.green.bold('it should get denied a users profile'), async () => {
    const user = await Users.getProfile({ input: { id: agentSnapshot.id, authorizedId: 103 } })
    expect(user.status).toEqual(200)
    expect(user.data.errors[0].name).toEqual('ForbiddenError')
  })

  test(chalk.green.bold('it should update the current user attributes'), async () => {
    const attr = { input: { id: agentSnapshot.id, authorizedId: agentSnapshot.id, user: { name: 'butters' } } }
    const user = await Users.updateUser(attr)
    expect(user.status).toEqual(200)
    expect(user.updateUser.user).toHaveProperty( 'type', 'agent' )
    expect(user.updateUser.user.name).toEqual("butters")
    // ----- Clean Up
    const revert = { input: { id: agentSnapshot.id, authorizedId: agentSnapshot.id, user: { name: 'Derek Rush' } } }
    const revertedAgent = await Users.updateUser(revert)
  })

  test(chalk.green.bold('it should update the current user associated address'), async () => {
    const attr = { input: { id: agentSnapshot.id, authorizedId: agentSnapshot.id,
      user: { name: 'bingo', address: silveradoHighSchool } } }
    const updatedUser = await Users.updateUser(attr)
    expect(updatedUser.status).toEqual(200)
    expect(updatedUser.updateUser.user.name).toEqual("bingo")
    expect(updatedUser.updateUser.user.address).toHaveProperty( 'address1', '25632 Peter A. Hartman Way' )
    expect(updatedUser.updateUser.user.address).toHaveProperty( 'lat', '33.6211337' )
    // ----- Clean Up
    const revert = { input: { id: agentSnapshot.id, authorizedId: agentSnapshot.id,
      user: { name: 'Derek Rush', address: agentSnapshot.address } } }
    const revertedAgent = await Users.updateUser(revert)
  })

})
