import _ from 'lodash'
import config from '../config'
import Address from './address'
import Db from '../models'
const OrderDb = Db.sequelize.models.order
const stripe = require("stripe")(config.stripe.secret_key)

class Order {

  constructor(){

  }

  static async createOrder(customer, payment, saveCard, plan, user, address) {
    // if(saveCard){
    //   const addCardtoCustomer = await stripe.customers.createSource(
    //     customer,
    //     { source: payment.id },
    //   )
    // }else{
      const charge = await stripe.charges.create({
        amount: plan.actualPrice,
        currency: "usd",
        source: payment.id,
        description: plan.name
      })
    // }
    if (charge.outcome.type == 'authorized'){
      this.internalOrder = await OrderDb.create({
        receiptId: charge.id,
        plan: plan.name,
        status: "pending",
        userId: user,
        addressId: address
      })
    } else {
      return "charge failed"
    }
    return this.internalOrder
  }
}

export default Order
