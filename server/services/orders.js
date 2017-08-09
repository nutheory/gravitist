const _ = require('lodash')
const config = require('../config')
const Address = require('./address')
const Db = require('../models')
const OrderDb = Db.sequelize.models.order
const AddressDb = Db.sequelize.models.address
const UserDb = Db.sequelize.models.user
const stripe = require("stripe")(config.stripe.secret_key)

const createOrder = async ({payment, plan, user, address}) => {

  const charge = await stripe.charges.create({
    amount: plan.actualPrice,
    currency: "usd",
    source: payment.id,
    description: plan.name
  })

  if (charge.outcome.type == 'authorized'){
    const internalOrder = await OrderDb.create({
      receiptId: charge.id,
      plan: plan.name,
      status: "pending",
      userId: user.id,
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
    console.log(res)
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

const openMissions = async (currentUser) => {
  const user = await UserDb.findOne({where: { id: currentUser.id }, include: [ AddressDb ]
  }).then((res) => { return res })

  const missions = await Db.sequelize.query(`SELECT "order"."id", "order"."status",
  "order"."plan", "order"."createdAt", "address"."id" AS "address.id",
  "address"."userId" AS "address.userId", "address"."orderId" AS "address.orderId",
  "address"."address1" AS "address.address1", "address"."address2" AS "address.address2",
  "address"."city" AS "address.city", "address"."state" AS "address.state",
  "address"."zipCode" AS "address.zipCode", "address"."type" AS "address.type",
  "address"."lat" AS "address.lat", "address"."lng" AS "address.lng",
  "address"."createdAt" AS "address.createdAt", "address"."updatedAt" AS "address.updatedAt"
  FROM orders AS "order" LEFT OUTER JOIN
    addresses AS "address" ON "order".id = "address"."orderId" WHERE "order".acceptedAt IS NULL AND earth_box(ll_to_earth
    (${user.address.lat}, ${user.address.lng}), ${user.workRadius * 1609.34}) @>
    ll_to_earth("address".lat, "address".lng)`)
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
      console.log(json)
      return json
    })
    return missions
}

module.exports = { createOrder, agentOrders, agentOrder, openMissions }
