const { createResolver } = require('apollo-resolvers')
const { baseResolver, isAuthenticated, isAuthorized, isAdmin } = require('./auth')
const { failed } = require('../../services/failed_missions')
const chalk = require('chalk')

const getFailedMissions = baseResolver.createResolver(
  async (root, { input }, { user }) => {
    const results = await failed({ attrs: input })
    console.log(chalk.blue.bold("INPUT"),results.failedMissions)
    return results
  }
)

const failedMissionResolvers = {

    Query: {
      getFailedMissions
    }

}

module.exports = { failedMissionResolvers }
