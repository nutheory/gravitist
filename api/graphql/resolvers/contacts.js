const { createResolver } = require('apollo-resolvers')
const { baseResolver, isAuthenticated, isAuthorized, isAgent } = require('./auth')
const { createOrderContact } = require('../../services/contacts')
const chalk = require('chalk')

const createLead = baseResolver.createResolver(
  async (root, { input }, { user }) => {
    console.log(chalk.blue.bold('LEAD'), input)
    const lead = await createOrderContact({ attrs: {
      contactable: 'order',
      contactableId: input.contactableId,
      name: input.lead.name,
      type: input.lead.type,
      content: input.lead.content,
    } })
    console.log(chalk.blue.bold('LEAD'), lead)
    return lead
  }
)

const contactResolvers = {

  Mutation: {
    createLead
  }

}

module.exports = { contactResolvers }
