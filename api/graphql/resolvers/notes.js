const { createResolver } = require('apollo-resolvers')
const { baseResolver, isAuthenticated, isAuthorized, isAgent } = require('./auth')
const { create, destroy, collection } = require('../../services/notes')
const chalk = require('chalk')

const getNotes = isAuthenticated.createResolver(
  async (root, { input }, { user }) => {
    const notes = await collection({ input })
    console.log(chalk.blue.bold('notes'), notes)
    return notes
  }
)

const createNote = isAuthenticated.createResolver(
  async (root, { input }, { user }) => {
    const note = await create({ input, usr: user })
    return note
  }
)

const destroyNote = isAuthenticated.createResolver(
  async (root, { input }, { user }) => {
    const note = await destroy(input.id, user.id)
    return note
  }
)

const noteResolvers = {

  Query: {
    getNotes
  },

  Mutation: {
    createNote,
    destroyNote
  }

}

module.exports = { noteResolvers }
