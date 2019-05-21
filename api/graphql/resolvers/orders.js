// show tory
const { createResolver } = require('apollo-resolvers')
const { baseResolver, isAuthenticated, isAuthorized, isAgent, isAdmin } = require('./auth')
const { Validate } = require('../../utils/validation')
const { discountToNumber } = require('../../utils/helpers')
const { getDiscount } = require('../../services/discounts')
const { create, update, signupToFly, bailMission, destroy, order, orders, approve, reject,
        missions, uploaded, notifyLocalPilots, gallery } = require('../../services/orders')
const { createAgent } = require('./users')
const Plans = require('../../utils/pricing_plans.json')
const { RobberyInProgressError } = require('../../utils/errors')
const { welcomeConfirmationMailer, confirmationMailer } = require('../../mailers/order')
const chalk = require('chalk')

const getGallery = baseResolver.createResolver(
  async (root, { input }, req) => {
    const result = await gallery({ uuid: input.uuid })
    return result
  }
)

const getOrders = isAuthenticated.createResolver(
  async (root, { input }, { user }) => {
    const ordersCollection = await orders({ usr: user, attrs: input })
    return ordersCollection
  }
)

const getOrder = isAuthenticated.createResolver(
  async (root, { input }, { user }) => {
    const result= await order({ usr: user, id: input.id })
    return result
  }
)

const getMissions = isAuthenticated.createResolver(
  async (root, { input }, { user }) => {
    const queryParams = {}
    queryParams.sortKey = input.sortKey || "distanceFromLocation"
    queryParams.sortValue = input.sortValue || "ASC"
    queryParams.sizeLimit = input.sizeLimit || 20
    queryParams.colOffset = input.colOffset || 0
    const openMissions = await missions({ usr: user, qryPrms: queryParams })
    return openMissions
  }
)

const createOrderWithUser = baseResolver.createResolver(
  async (root, args, req) => {
    const newUser = await createAgent(root, args, req)
    req.user = newUser.user
    const result = await createOrder(root, args, req, true )
    welcomeConfirmationMailer({ order: result.order, user: newUser.user })
    return { order: result.order, auth: newUser.auth }
  }
)

const createOrder = isAgent.createResolver(
  async (root, { input }, { user }, newUser = false) => {
    if(input.order.discountId){
      const { discount } = await getDiscount({ id: input.order.discountId })
      const plan = Plans.find((pl) => pl.name === input.order.plan.name )
      if( input.order.amountPaid !== discountToNumber(discount.amount, plan.actualPrice).toString() ){
        throw RobberyInProgressError({ args: { input }, loc: "createOrder"})
      }
    }
    const order = await create({ ordr: input.order, usr: user, addr: input.order.address })
    // if( !newUser ){ confirmationMailer({ order, user }) }
    // notifyLocalPilots({ ordr: order })
    order.agent = user
    return { order }
  }
)

const updateOrder = isAuthorized.createResolver(
  async (root, { input }, { user }) => {
    const result = await update({ usr: user, id: input.id, ordr: input.order, addr: input.address })
    return result
  }
)

const joinPilot = isAuthenticated.createResolver(
  async (root, { input }, { user }) => {
    const result = await signupToFly({ usr: user, id: input.id, updates: input })
    // sendEmailConfirmationToUser,
    return result
  }
)

const bailPilot = isAuthenticated.createResolver(
  async (root, { input }, { user }) => {
    const result = await bailMission({ usr: user, id: input.id, updates: input })
    return result
  }
)

const approveOrder = isAdmin.createResolver(
  async (root, { input }, { user }) => {
    console.log(chalk.blue.bold("MISSONS? input"),input)
    const result = await approve({ user, id: input.id, photos: input.order.photos })
    return result
  }
)

const rejectOrder = isAdmin.createResolver(
  async (root, { input }, { user }) => {
    input.user = user
    const result = await reject({ attrs: input })
    return result
  }
)

const uploadedOrder = isAuthorized.createResolver(
  async (root, { input }, { user }) => {
    const result = await uploaded({ usr: user, id: input.id, updates: input })
    return result
  }
)

const destroyOrder = isAuthorized.createResolver(
  async (root, { input }, { user }) => {
    const result = await destroy( input.id )
    return result
  }
)

const orderResolvers = {

  Query: {
    getGallery,
    getOrder,
    getOrders,
    getMissions
  },

  Mutation: {
    createOrderWithUser,
    createOrder,
    approveOrder,
    rejectOrder,
    joinPilot,
    bailPilot,
    uploadedOrder,
    updateOrder,
    destroyOrder
  }

}

module.exports = { orderResolvers }
