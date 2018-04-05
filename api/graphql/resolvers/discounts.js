const { createResolver } = require('apollo-resolvers')
const { baseResolver, isAuthenticated, isAuthorized, isAdmin } = require('./auth')
const { create, destroy, discounts, apply } = require('../../services/discounts')

const chalk = require('chalk')

const getDiscounts = isAdmin.createResolver(
  async (root, { input }, { user }) => {
    const discountCollection = await discounts()
    console.log(chalk.blue.bold('discountCollection'), discountCollection)
    return discountCollection
  }
)

const createDiscount = isAdmin.createResolver(
  async (root, { input }, { user }) => {
    const { discount } = await create({ attrs: input, usr: user })
    console.log(chalk.blue.bold('discount'), discount)
    return discount
  }
)

const destroyDiscount = isAdmin.createResolver(
  async (root, { input }, { user }) => {
    const discount = await destroy({ id: input.id })
    return discount
  }
)

const applyDiscount = baseResolver.createResolver(
  async (root, { input }, { user }) => {
    const discount = await apply({ code: input.code })
    return discount
  }
)

const discountResolvers = {

  Query: {
    getDiscounts,
    applyDiscount
  },

  Mutation: {
    createDiscount,
    destroyDiscount
  }

}

module.exports = { discountResolvers }
