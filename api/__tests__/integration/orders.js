// const { serverStart } = require('../../server')
const db = require('../../models')
const Orders = require('../resolverMethods/orders')
const { gQL, gQLget, gQLpost, generateUserData, generateAddressData, cleanUpTestItem,
  cleanUpTestItemAsAdmin, responseFactory, LogIn } = require('../utils/helpers')
const { silveradoHighSchool, missionViejoMall, longBeachAirport,
   sanDiegoInternationalAirport } = require('./addresses')
// const { uploadPilotAssets } = require('./assets')
const plans = require('../../../client/utils/pricing_plans.json')
const Faker = require('faker')
const chalk = require('chalk')
const _ = require('lodash')

describe('order mutations', () => {

  test(chalk.green.bold('it should create a new order and user at the same time'), async () => {
    gQL.defaults.headers.common.authorization = ''
    const generalUserData = await generateUserData()
    const user = _.merge( generalUserData, { stripeToken: "tok_visa" } )
    const plan = { name: plans[1].name, amountPaid: plans[1].actualPrice }
    const attrInput = { order: { plan , address: missionViejoMall }, user }
    const order = await Orders.create( 'OrderWithUser', attrInput )
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

describe('Authenticated queries & mutations for agent orders', () => {

  let agent, agentSnapshot

  beforeAll( async () => {
    agent = await LogIn.agent()
    gQL.defaults.headers.common.authorization = agent.loginUser.auth.token
    agentSnapshot = agent.loginUser.user
  })

  afterAll( async () => {
    gQL.defaults.headers.common.authorization = ''
  })

  test(chalk.green.bold('it should create a new order for existing agent'), async () => {
    const plan = { name: plans[0].name, actualPrice: plans[0].actualPrice }
    const attr = { order: { plan, address: longBeachAirport } }
    const order = await Orders.create( 'Order', attr )
    const orderResult = order.result["createOrder"].order
    expect(orderResult.receiptId).toEqual(expect.any(String))
    expect(orderResult.address).toHaveProperty('lat', expect.any(String))
    expect(orderResult.agent).toHaveProperty('type', 'agent')
    const clean = order.cleanUpOrder
    return clean()
  })

  test(chalk.green.bold('it should fail creation without address'), async () => {
    const plan = { name: plans[0].name, actualPrice: plans[0].actualPrice }
    const attr = { order: { plan } }
    const order = await Orders.create( 'Order', attr )
    expect(order.result.status).toEqual(200)
    expect(order.result.data).toHaveProperty('errors')
  })

  test(chalk.green.bold('it should update a order by a agent'), async () => {
    const order = await db.Order.findOne({ where: { agentId: agentSnapshot.id },
      include: [ { model: db.Address, as: 'address' } ] })
    const attr = { input: { id: order.id, authorizedId: order.agentId,
      order: { status: 'processing', address: silveradoHighSchool } } }
    const updatedOrder = await Orders.update(attr)
    const updateResult = updatedOrder["updateOrder"].order
    expect(updateResult.status).toEqual('processing')
    expect(updateResult.address).toHaveProperty('address1', '25632 Peter A. Hartman Way')
    // ----- Clean Up
    const { address1, city, state, zipCode, lat, lng } = order.address
    const revert = { input: { id: order.id, authorizedId: order.agentId,
      order: { status: 'pending', address: { address1, city, state, zipCode, lat, lng } } } }
    const revertedOrder = await Orders.update(revert).then(res => { return res })
  })

  test(chalk.green.bold('it should destroy a order'), async () => {
    const plan = { name: plans[0].name, actualPrice: plans[0].actualPrice }
    const attr = { order: { plan, address: longBeachAirport } }
    const order = await Orders.create( 'Order', attr )
    const orderResult = order.result["createOrder"].order
    const destroyResult = await Orders.destroy({ input: { id: orderResult.id, authorizedId: agentSnapshot.id } })
    const destroyedOrder = destroyResult["destroyOrder"].order
    expect(destroyedOrder.plan).toEqual(orderResult.plan)
    expect(destroyedOrder.address).toHaveProperty('zipCode', orderResult.address.zipCode)
  })

  test(chalk.green.bold('it should get a specific order by id'), async () => {
    const orders = await Orders.getOrders({ input: {} })
    const tempOrder = _.sample(orders.getOrders)
    const order = await Orders.getOrder({ input: { id: tempOrder.id, authorizedId: agentSnapshot.id } })
    expect(order.status).toEqual(200)
    expect(order.getOrder.order.agent).toHaveProperty('type', 'agent')
  })

  test(chalk.green.bold('it should get a list of all orders by date'), async () => {
    const orders = await Orders.getOrders({ input: { sortKey: 'createdAt', sortValue: 'DESC' } })
    expect(orders.status).toEqual(200)
    expect(orders.getOrders[0]).toHaveProperty('plan')
    expect(orders.getOrders[0].agent).toHaveProperty('type', 'agent')
  })

})

describe('Authenticated pilot queries & mutations', () => {

  let pilot, pilotSnapshot

  beforeAll( async () => {
    pilot = await LogIn.pilot()
    gQL.defaults.headers.common.authorization = pilot.loginUser.auth.token
    pilotSnapshot = pilot.loginUser.user
  })

  afterAll( async () => {
    gQL.defaults.headers.common.authorization = ''
  })

  test(chalk.green.bold('it should get all possible open missions for a pilot within working radius'), async () => {
    const missions = await Orders.getMissions({ input: { sortKey: 'distanceFromLocation', sortValue: 'ASC', sizeLimit: 5 } })
    expect(missions.status).toEqual(200)
    expect(missions.getMissions.length).toBeLessThan(6)
    expect(missions.getMissions[0]).toHaveProperty("agent")
    expect(missions.getMissions[0].pilotId).toEqual(null)
    expect(missions.getMissions[0].distanceFromLocation).toBeLessThan(missions.getMissions[3].distanceFromLocation)
  })

  test(chalk.green.bold('it should get all missions assigned to a pilot '), async () => {
    const orders = await Orders.getOrders({ input: { sortKey: 'pilotAcceptedAt', sortValue: 'DESC', sizeLimit: 5 } })
    expect(orders.status).toEqual(200)
    expect(orders.getOrders[0]).toHaveProperty('plan')
    expect(orders.getOrders[0].pilot).toHaveProperty('type', 'pilot')
  })

  test(chalk.green.bold('it should join/leave mission and update order status'), async () => {
    const missions = await Orders.getMissions({ input: { sortKey: 'distanceFromLocation', sortValue: 'ASC', sizeLimit: 5 } })
    const missionToAccept = missions.getMissions[0]
    expect(missionToAccept.pilotId).toEqual(null)
    const acceptedMission = await Orders.joinOrLeaveCollaboration({ input: { id: missionToAccept.id, status: 'filming' } })
    expect(acceptedMission.joinOrLeaveCollaboration.order.status).toEqual('filming')
    expect(acceptedMission.joinOrLeaveCollaboration.order.pilot).toHaveProperty('type', 'pilot')
    // ----- Leave Mission/Clean Up
    const authId = acceptedMission.joinOrLeaveCollaboration.order.pilot.id
    const leavingMission = await Orders.joinOrLeaveCollaboration({ input: { id: missionToAccept.id, authorizedId: authId, status: 'pending' } })
    expect(leavingMission.joinOrLeaveCollaboration.order.status).toEqual('pending')
    expect(leavingMission.joinOrLeaveCollaboration.order.pilot).toEqual(null)
  })

  // test(chalk.green.bold('it should update order with pilot assets'), async () => {
  //   const orders = await Orders.getOrders({ input: { sortKey: 'pilotAcceptedAt', sortValue: 'DESC', sizeLimit: 5 } })
  //   expect(orders.getOrders[0].pilot).toHaveProperty('id', pilotSnapshot.id)
  //   const upload = await uploadPilotAssets()
  // })

})

// describe('Authenticated editor queries & mutations', () => {
//
//   let editor, editorSnapshot
//
//   beforeAll( async () => {
//     editor = await LogIn.editor()
//     gQL.defaults.headers.common.authorization = editor.loginUser.auth.token
//     editorSnapshot = editor.loginUser.user
//   })
//
//   afterAll( async () => {
//     gQL.defaults.headers.common.authorization = ''
//   })
//
//
//
// })
