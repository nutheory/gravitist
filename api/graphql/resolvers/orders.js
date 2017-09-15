const { CreateOrder, AgentOrder, AgentOrders, createStripeCharge, DestroyOrder } = require('../../services/orders')
const { validateAddressInput } = require('../../services/addresses')
const { createAgent } = require('./users')
const { mustHaveId } = require('../../utils/helpers')
const _ = require('lodash')

const chalk = require('chalk')

async function agentOrder(root, args, req){
  return AgentOrder(req.user, args)
}

async function agentOrders(root, args, req){
  return AgentOrders(req.user)
}

async function createOrderWithUser(root, args, req){
  args.input.user = args.input.order.user
  const agent = await createAgent(null, args, req).then(res => {
    req.user = res.user
    console.log(chalk.green.bold("AAAARRRRRRGGGGGGSSSSSSS createOrderWithUser"), req.user.id)
    return res
  })
  const result = await createOrder(null, args, req)
  result.auth = agent.auth
  console.log(chalk.green.bold("@@@@@@@@@@@@@@@@@@@@ createOrderWithUser"), result)
  return result
}

async function createOrder(root, args, req){
  const validatedAddress = await validateAddressInput( args.input.order.address )
  const stripeResult = await createStripeCharge({ plan: args.input.order.planInfo, customer: req.user.customerId })
  console.log(chalk.green.bold("AAAARRRRRRGGGGGGSSSSSSS createOrder"), req.user.id)
  const orderInput = { agent: req.user.id, receipt: stripeResult.id,
    plan: args.input.order.planInfo.name, address: validatedAddress, status: 'pending' }
  const result = await CreateOrder( orderInput ).then( res => {
    return { order: _.merge(res.dataValues, { agent: req.user }), auth: {}  }
  })
  console.log(chalk.green.bold("@@@@@@@@@@@@@@@@@@@@ createOrder"), result)
  return result
}

async function missions(root, args, req){
  const missions = await Order.missions(req.user)
  return missions
}

async function destroyOrder( root, args, req ){
  const id = await mustHaveId(args.input.itemId)
  const user = await DestroyOrder( id, req )
  return user
}

module.exports = { createOrder, createOrderWithUser, agentOrders, agentOrder, missions, destroyOrder }
