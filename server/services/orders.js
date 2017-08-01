const _ = require('lodash')
const config = require('../config')
const Address = require('./address')
const Db = require('../models')
const OrderDb = Db.sequelize.models.order
const AddressDb = Db.sequelize.models.address
const UserDb = Db.sequelize.models.user
const stripe = require("stripe")(config.stripe.secret_key)

const createOrder = async (customer, payment, saveCard, plan, user, address) => {
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
    const internalOrder = await OrderDb.create({
      receiptId: charge.id,
      plan: plan.name,
      status: "pending",
      userId: user,
      addressId: address
    })
  } else {
    return "charge failed"
  }
  return internalOrder
}

const agentOrders = (user) => {
  return OrderDb.findAll({
    where: {userId: user.id},
    include: [ AddressDb ],
    order: [['createdAt', 'DESC']]
  }).then((res) => {
    return res
  })
}

const agentOrder = (user, args) => {
  if(args.id){
    return OrderDb.find({
      where: { id: args.id, userId: user.id },
      include: [ AddressDb, UserDb ]
    }).then((res) => {
      return res
    })
  } else {
    return OrderDb.findOne({
      where: { userId: user.id },
      include: [ AddressDb, UserDb ],
      order: [[ 'createdAt', 'DESC' ]]
    }).then((res) => {
      return res
    })
  }
}

module.exports = { createOrder, agentOrders, agentOrder }
