const { intStart } = require('../utils/integration_server')
const { randSix, gQL, gQLget, gQLpost, generateUserData, generateAddressData,
  cleanUpTestItem, responseFactory, logInAgent } = require('../utils/helpers')
const _ = require('lodash')
const Faker = require('faker')
const chalk = require('chalk')

// let server
//
// beforeAll(() => {
//   intStart().then(s => {server = s})
// })
//
// afterAll(done => {
//   server.close(done)
// })

describe('creating users with types', () => {

  test(chalk.green.bold('it should create a agent'), async () => {
    const attr = { stripeInfo: "tok_visa" }
    const email = `drush81+agent${randSix()}@gmail.com`
    const agent = await createNewUser( "Agent", attr, { email } )
    expect(agent.result.status).toEqual(200)
    expect(agent.result[`createAgent`].user).toHaveProperty( 'type', 'agent' )
    const clean = agent.cleanUpUser
    return clean()
  })

  test(chalk.green.bold('it should create a pilot'), async () => {
    const address = await generateAddressData()
    const email = `drush81+pilot${randSix()}@gmail.com`
    const attr = { stripeInfo: "tok_visa", licenseId: '1', insuranceId: '1', workRadius: '50', address: address }
    const pilot = await createNewUser( "Pilot", attr, { email } )
    expect(pilot.result.status).toEqual(200)
    expect(pilot.result["createPilot"].user).toHaveProperty('type', 'pilot')
    expect(pilot.result["createPilot"].user.address).toHaveProperty('zipCode', expect.any(String))
    const clean = pilot.cleanUpUser
    return clean()
  })

  test(chalk.green.bold('it should create a editor'), async () => {
    const attr = { stripeInfo: "tok_visa" }
    const email = `drush81+editor${randSix()}@gmail.com`
    const editor = await createNewUser("Editor", attr, { email } )
    expect(editor.result.status).toEqual(200)
    expect(editor.result["createEditor"].user).toHaveProperty('type', 'editor')
    const clean = editor.cleanUpUser
    return clean()
  })

  test(chalk.green.bold('it should create a admin'), async () => {
    const attr = {}
    const email = `drush81+admin${randSix()}@gmail.com`
    const admin = await createNewUser("Admin", attr, { email } )
    expect(admin.result.status).toEqual(200)
    expect(admin.result["createAdmin"].user).toHaveProperty('type', 'admin')
    const clean = admin.cleanUpUser
    return clean()
  })

  test(chalk.green.bold('it should delete the current user'), async () => {
    const attr = { stripeInfo: "tok_visa" }
    const email = `drush81+deleteMe${randSix()}@gmail.com`
    const agent = await createNewUser("Agent", attr, { email } )
    expect(agent.result.status).toEqual(200)
    gQL.defaults.headers.common.authorization = agent.result.createAgent.auth.token
    const id = agent.result.createAgent.user.id
    const deleted = await destroyUser( { itemId: id, ownerId: id } )
    expect(deleted.status).toEqual(200)
    expect(deleted.destroyUser.name).toEqual(agent.result.createAgent.user.name)
    gQL.defaults.headers.common.authorization = ''
  })

})

describe('perform tasks as authenticated user', () => {

  let agent, agentSnapshot

  beforeAll( async () => {
    agent = await logInAgent()
    gQL.defaults.headers.common.authorization = agent.login.auth.token
    agent = agent.login.user
    agentSnapshot = agent
  })

  afterAll( async () => {
    gQL.defaults.headers.common.authorization = ''
  })

  test(chalk.green.bold('it should get user info'), async () => {
    const user = await userProfile(agent.id)
    expect(user.status).toEqual(200)
    expect(user.userProfile.user).toHaveProperty( 'name', 'Derek Rush' )

  })

  // test(chalk.green.bold('it should get user stripe info'), async () => {
  //
  // })

  test(chalk.green.bold('it should update the current user attributes'), async () => {
    const attr = { id: agent.id, name: 'butters' }
    const updatedUser = await updateUser(attr)
    expect(updatedUser.status).toEqual(200)
    expect(updatedUser.updateUser).toHaveProperty( 'type', 'agent' )
    expect(updatedUser.updateUser.name).toEqual("butters")
    // ----- Clean Up
    const revert = { id: agent.id, name: agentSnapshot.name }
    const revertedAgent = await updateUser(revert)
  })

  // test(chalk.green.bold('it should update the current user associated address'), async () => {
  //   const attr = { id: agent.login.user.id, stripeInfo: 'tok_mastercard' }
  //   const customerId = agent.login.user.customerId
  //   const updatedAgent = await updateUser(attr)
  //   expect(updatedAgent.status).toEqual(200)
  //   console.log(, updatedAgent["updateUser"].customerId)
  //   expect(updatedAgent["updateUser"].customerId.toString()).toEqual(expect.stringContaining(expect.stringMatching(/^cus/)))
  //   expect(updatedAgent["updateUser"].customerId).not.toEqual(currentStripeId)
  // })
  //
  // test(chalk.green.bold('it should update the current user billing/payment info'), async () => {
  //   const attr = { id: agent.result['createAgent'].id, stripeInfo: 'tok_mastercard' }
  //   const currentStripeId = agent.result['createAgent'].customerId
  //   const updatedAgent = await updateUser(attr)
  //   expect(updatedAgent.status).toEqual(200)
  //   console.log("updatedAgent[\"updateUser\"].customerId", updatedAgent["updateUser"].customerId)
  //   expect(updatedAgent["updateUser"].customerId.toString()).toEqual(expect.stringContaining(expect.stringMatching(/^cus/)))
  //   expect(updatedAgent["updateUser"].customerId).not.toEqual(currentStripeId)
  // })

})

async function userProfile( id ){
  const query = `
    query($id: ID){
      userProfile(id: $id){
        user {
          id
          name
          email
          customerId
          type
          address {
            zipCode
          }
        }
      }
    }
  `
  const result = await gQLpost({ query, variables: { id } })
  return result
}

async function createNewUser( mutationName, attrs = {}, overrides ) {
  const generalUserData = await generateUserData(overrides)
  let userInfo = _.merge(generalUserData, attrs)
  let data = {}
  const query = `
    mutation($input: ${mutationName}Input){
      create${mutationName}(input: $input){
        user {
          id
          name
          email
          customerId
          type
          address {
            zipCode
          }
        }
        auth {
          token
        }
      }
    }
  `
  let variables = { input: { user: userInfo } }
  const result = await gQLpost({query, variables})
  const user = result[`create${mutationName}`].user
  return {
    result,
    async cleanUpUser(){
      gQL.defaults.headers.common.authorization = result[`create${mutationName}`].auth.token
      const wait = await cleanUpTestItem("destroyUser", { input: { itemId: user.id, ownerId: user.id }}).then(res => {
        gQL.defaults.headers.common.authorization = ''
        return res
      })
    }
  }
}

async function updateUser(attrs = {}){
  const variables = { input: attrs }
  const query = `
    mutation($input: UpdateUserInput) {
      updateUser(input: $input){
        id
        name
        email
        type
        customerId
      }
    }`
  const result = await gQLpost({query, variables})
  return result
}

async function destroyUser(vars){
  const variables = { input: vars }
  const query = `
    mutation($input: DestroyUserInput){
      destroyUser(input: $input){
        name
      }
    }`
  const result = await gQLpost({query, variables})
  return result
}
