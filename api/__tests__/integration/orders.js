const { intStart } = require('../utils/integration_server')
const { gQL, gQLpost, generateUserData, generateAddressData, cleanUpTestItem,
  cleanUpTestItemAsAdmin, responseFactory, logInAgent } = require('../utils/helpers')
const { silveradoHighScool, missionViejoMall, longBeachAirport,
   sanDiegoInternationalAirport } = require('./addresses')
const plans = require('../../../client/utils/pricing_plans.json')
const Faker = require('faker')
const chalk = require('chalk')
const _ = require('lodash')

// let server
//
// beforeAll(() => {
//   intStart().then(s => {server = s})
// })
//
// afterAll(done => {
//   server.close(done)
// })

describe('order mutations', () => {

  test(chalk.green.bold('it should create a new order and user at the same time'), async () => {
    gQL.defaults.headers.common.authorization = ''
    const generalUserData = await generateUserData()
    const user = _.merge( generalUserData, { stripeInfo: "tok_visa" } )
    const planInfo = { name: plans[1].name, actualPrice: plans[1].actualPrice }
    const attrInput = { planInfo, address: missionViejoMall, user }
    const order = await createNewOrder( 'OrderWithUser', attrInput )
    const orderResult = order.result["createOrderWithUser"]
    expect(orderResult.order.receiptId).toEqual(expect.any(String))
    expect(orderResult.order.agent).toHaveProperty('name', user.name)
    expect(orderResult.auth).toHaveProperty('token', expect.any(String))
    expect(orderResult.order.agent).toHaveProperty('type', 'agent')
    expect(orderResult.order.address).toHaveProperty('zipCode', '92691')
    cleanUpTestItemAsAdmin('destroyUser', orderResult.order.agent.id)
    const clean = order.cleanUpOrder
    return clean()
  })

})

describe('Authenticated agent order mutations', () => {

  let cleanUpUser, agent, clean, orderResult

  beforeAll( async () => {
    agent = await logInAgent()
    gQL.defaults.headers.common.authorization = agent.login.auth.token
  })

  afterAll( async () => {
    gQL.defaults.headers.common.authorization = ''
  })

  test(chalk.green.bold('it should create a new order for existing agent'), async () => {
    const planInfo = { name: plans[0].name, actualPrice: plans[0].actualPrice }
    const attrInput = { planInfo, address: longBeachAirport }
    const order = await createNewOrder( 'Order', attrInput )
    orderResult = order.result["createOrder"].order
    expect(orderResult.receiptId).toEqual(expect.any(String))
    expect(orderResult.address).toHaveProperty('lat', expect.any(String))
    expect(orderResult.agent).toHaveProperty('type', 'agent')
    const clean = order.cleanUpOrder
    return clean()
  })

  // test(chalk.green.bold('it should update a order'), async () => {
  //   console.log('orderResult',orderResult)
  // })
  //
  // test(chalk.green.bold('it should destroy a order'), async () => {
  //
  // })

})
//
// describe('Authenticated agent order queries', () => {
//
//   test(chalk.green.bold('it should get a specific order by id'), async () => {
//
//   })
//
//   test(chalk.green.bold('it should get a list of all orders by date'), async () => {
//
//   })
//
// })
//
//
// describe('Pilot querying agent orders', () => {
//
//   test('it should get most recent order', () => {
//
//   })
//
//   test('it should get a specific order by id', () => {
//
//   })
//
//   test('it should get all orders by user', () => {
//
//   })
//
// })
//
// describe('querying pilot missions', () => {
//
//   test('it should get all possible open missions for a pilot within working radius', () => {
//
//   })
//
//   test('it should get all missions assigned to a pilot', () => {
//
//   })
//
// })

async function createNewOrder( mutationName, attrs = {} ){
  const query = `
    mutation($input: ${mutationName}Input){
      create${mutationName}(input: $input){
        order {
          id
          plan
          receiptId
          status
          address {
            zipCode
            lat
          }
          agent {
            id
            type
            name
          }
        }
        auth {
          token
        }
      }
    }
  `
  const variables = { input: { order: attrs } }
  const result = await gQLpost({ query, variables })
  const order = result[`create${mutationName}`].order
  return {
    result,
    async cleanUpOrder(){
      if (result[`create${mutationName}`].auth.token){
        gQL.defaults.headers.common.authorization = result[`create${mutationName}`].auth.token
      }
      const wait = await cleanUpTestItem("destroyOrder", { input: { itemId: order.id, ownerId: order.agent.id }}).then(res => {
        gQL.defaults.headers.common.authorization = ''
        return res
      })
    }
  }
}
