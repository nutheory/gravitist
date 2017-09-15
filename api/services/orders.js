const _ = require('lodash')
const config = require('../config')
const Db = require('../models')
const Order = Db.sequelize.models.order
const Address = Db.sequelize.models.address
const User = Db.sequelize.models.user
const { getUserWith, isAdmin } = require('./users')
const stripe = require("stripe")(config.stripe_test.secret_key)
const AppError = require('../utils/appErrors').createAppError
const chalk = require('chalk')

async function CreateOrder({ agent, receipt, plan, address, status }){

  console.log(chalk.green.bold("AAAARRRRRRGGGGGGSSSSSSS SER"), agent)
  const order = await Order.create({
    agentId: agent,
    receiptId: receipt,
    plan: plan,
    address: address,
    status: status
  }, { include: [ Address ] })
  return order
}

function createStripeCharge({ plan, customer }){
  const stripeCharge = stripe.charges.create({
    amount: plan.actualPrice,
    customer: customer,
    currency: "usd",
    description: plan.name
  }).then(res => { return res })
  return stripeCharge
}

function agentOrders(user){
  return Order.findAll({
    where: {userId: user.id},
    include: [ Address ],
    order: [['createdAt', 'DESC']]
  }).then(res => { return res })
}

function agentOrder(user, args){
  if(args.id){
    return Order.find({
      where: { id: args.id, userId: user.id },
      include: [ Address, User ]
    }).then(res => {
      return res
    })
  } else {
    return Order.findOne({
      where: { userId: user.id },
      include: [ Address, User ],
      order: [[ 'createdAt', 'DESC' ]]
    }).then((res) => {
      return res
    })
  }
}

async function missions(currentUser, orderState = null ){
  const user = await getUserWith( currentUser, [ Address ] )
  const missions = await Db.sequelize.query(`SELECT "order"."id", "order"."status",
  (earth_distance(ll_to_earth( ${user.address.lat},${user.address.lng} ),
  ll_to_earth("address".lat, "address".lng))/1609.34) AS "distanceFromLocation",
  "order"."plan", "order"."createdAt", "order"."acceptedAt", "address"."id" AS "address.id",
  "address"."userId" AS "address.userId", "address"."orderId" AS "address.orderId",
  "address"."address1" AS "address.address1", "address"."address2" AS "address.address2",
  "address"."city" AS "address.city", "address"."state" AS "address.state",
  "address"."zipCode" AS "address.zipCode", "address"."type" AS "address.type",
  "address"."lat" AS "address.lat", "address"."lng" AS "address.lng",
  "address"."createdAt" AS "address.createdAt", "address"."updatedAt" AS "address.updatedAt"
  FROM orders AS "order" LEFT OUTER JOIN
    addresses AS "address" ON "order".id = "address"."orderId"
    ${orderState === null || "open" ? 'WHERE "order"."acceptedAt" IS NULL' : ''}
    AND earth_box(ll_to_earth(${user.address.lat}, ${user.address.lng}), ${user.workRadius * 1609.34}) @>
    ll_to_earth("address".lat, "address".lng) ORDER BY "distanceFromLocation" ASC`)
    .spread((res, meta) => {
      let json = []
      _.each(res, (order) => {
        let newOrder = {}
        let address = {}
        _.each(order, (val, key) => {
          if(key.indexOf('.') !== -1){
            let newKey = key.split('.')[1]
            address[newKey] = val
          } else {
            newOrder[key] = val
          }
        })
        newOrder['address'] = address
        json.push(newOrder)
      })
      return json
    })
    return missions
}

async function DestroyOrder( orderId, req ){
  const order = await Order.findOne({ where: { id: orderId }, include: [ Address ] })
  if ( isAdmin || req.user.id == order.agentId ) {
    const destroyed = order
    order.destroy()
    return { receiptId: destroyed.receiptId, address: destroyed.address }
  } else {
    throw( AppError( {
      type: `Order.Auth`,
      message: `You cannot delete this order.`
    } ) )
  }

}

module.exports = { CreateOrder, createStripeCharge, agentOrders, agentOrder, missions, DestroyOrder }
