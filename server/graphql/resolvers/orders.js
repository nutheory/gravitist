const Order = require('../../services/orders')
const Address = require('../../services/address')
const User = require('../../services/users')

const agentOrder = async (root, args, req) => {
  return Order.agentOrder(req.user, args)
}

const agentOrders = async (root, args, req) => {
  return Order.agentOrders(req.user)
}

const createOrder = async (root, args, req) => {
  const payment =JSON.parse(args.input.stripeInfo)
  const plan = JSON.parse(args.input.plan)
  const agent = await User.createAgent(args.input.user, args.input.stripeInfo.id, req)
  const address = await Address.createAddress( args.input.address )
  const orderInput = {payment, plan, agent, address: address.id}
  const order = await Order.createOrder(orderInput)

  return { id: order.id, plan: order.plan, receiptId: order.receiptId, status: order.status,
    address: address, user: { name: agent.name, email: agent.email } }
}

const openMissions = async (root, args, req) => {
  const missions = await Order.openMissions(req.user)

  // console.log('MISS', missions)
  return missions
}

module.exports = { createOrder, agentOrders, agentOrder, openMissions }
