const { createResolver } = require('apollo-resolvers')
const { baseResolver, isAuthenticated, isAuthorized, isAgent, isPilot, isEditor } = require('./auth')
const { toggleDefault, updateActive, destroy, assets } = require('../../services/assets')
const chalk = require('chalk')

const getAssets = baseResolver.createResolver(
  async ( root, { input }, { user } ) => {
    const result = await assets({
      assetableId: input.modelId,
      assetable: input.modelType,
      assetableName: input.modelName,
      active: input.active })
    return result
  }
)

const toggleDefaultAsset = isAuthenticated.createResolver(
  async ( root, { input }, { user } ) => {
    const result = await toggleDefault({
      defaultId: input.id,
      assetableId: input.modelId,
      assetable: input.modelType,
      assetableName: input.modelName })
    return result
  }
)

const updateAsset = isAuthorized.createResolver(
  async ( root, { input }, { user } ) => {
    const result = await toggleActive({
      newActiveId: input.id,
      assetableId: input.modelId,
      assetable: input.modelType,
      assetableName: input.modelName })
    return result
  }
)

const destroyAsset = isAuthenticated.createResolver(
  async ( root, { input }, { user } ) => {
    const result = await destroy({
      id: input.id,
      assetableId: input.modelId,
      assetable: input.modelType,
      assetableName: input.modelName,
      usr: user })
    return result
  }
)

const assetResolvers = {

  Query: {
    getAssets
  },

  Mutation: {
    toggleDefaultAsset,
    updateAsset,
    destroyAsset
  }

}

module.exports = { assetResolvers }
