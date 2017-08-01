const Order = require('../../services/orders')
const Address = require('../../services/address')
const User = require('../../services/users')

const agentOrder = async (root, args, req) => {
  console.log('req.reqreqreqreqreqreqreqreq', req.user)
  console.log('args', args)
  return Order.agentOrder(req.user, args)
}

const agentOrders = async (root, args, req) => {
  console.log('req.user', req.user)
  return Order.agentOrders(req.user)
}

const createOrder = async (root, args, req) => {
  const payment =JSON.parse(args.input.stripeInfo)
  const plan = JSON.parse(args.input.plan)

  const agent = await User.createAgent(
    args.input.user,
    args.input.stripeInfo.id,
    req
  )

  const address = await Address.createAddress(
    args.input.address
  )

  const order = await Order.createOrder(
    agent.customerId,
    payment,
    args.input.saveCard,
    plan,
    agent.id,
    address.id
  )

  console.log('agent', agent)
  return {
    id: order.id, plan: order.plan, receiptId: order.receiptId, status: order.status,
    address: { id: address.id, address1: address.address1, address2: address.address2,
      city: address.city, state: address.state, zip: address.zip },
    user: { name: agent.name, email: agent.email }
  }
}

module.exports = { createOrder, agentOrders, agentOrder }
