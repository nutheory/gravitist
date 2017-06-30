import Order from '../../services/orders'
import Address from '../../services/address'
import User from '../../services/users'

class OrderResolver{

  static async createOrder(root, args, req){
    console.log(req.headers.authorization)
    const payment =JSON.parse(args.input.stripeInfo)
    const plan = JSON.parse(args.input.plan)
    // Check for token
    // Has token
      // Is token Valid
        // No. return to login
        // Yes. store in const
    // No token
    const agent = await User.createAgent(
      args.input.user,
      args.input.stripeInfo.id,
      req
    )

    const address = await Address.createAddress(
      args.input.address
    )

    const order = await Order.createOrder(
      agent.accountId,
      payment,
      args.input.saveCard,
      plan,
      agent.id,
      address.id
    )
    return {
      id: order.id, plan: order.plan, receiptId: order.receiptId, status: order.status,
      address: { id: address.id, address1: address.address1, address2: address.address2,
        city: address.city, state: address.state, zip: address.zip },
      user: { name: agent.name, email: agent.email, token: agent.token }
    }
  }
}

export default OrderResolver
