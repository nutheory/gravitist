const { createResolver } = require('apollo-resolvers')
const { createError, isInstance } = require('../../utils/appErrors')
const { UnknownError, UnauthorizedError, AlreadyAuthenticatedError, ForbiddenError } = require('../../utils/errors')
const chalk = require('chalk')

const baseResolver = createResolver(
  (root, args, context, error) => {
    isInstance(error) ? error : new UnknownError()
  }
)

const isAuthenticated = baseResolver.createResolver(
  (root, args, { user }) => {
    if( !user ){ throw new UnauthorizedError() }
  }
)

const isAgent = isAuthenticated.createResolver(
  (root, { input }, { user }) => {
    if( user.type !== "agent" && user.type !== "admin" ){ throw new ForbiddenError() }
  }
)

const isPilot = isAuthenticated.createResolver(
  (root, { input }, { user }) => {
    if( user.type !== "pilot" && user.type !== "admin" ){ throw new ForbiddenError() }
  }
)

const isEditor = isAuthenticated.createResolver(
  (root, { input }, { user }) => {
    if( user.type !== "editor" && user.type !== "admin" ){ throw new ForbiddenError() }
  }
)

const isAuthorized = isAuthenticated.createResolver(
  (root, { input }, { user }) => {
    const { authorizedId } = input
    if( user.type !== "admin" && parseInt(authorizedId) !== user.id ){ throw new ForbiddenError() }
  }
)

module.exports = { baseResolver, isAuthenticated, isAuthorized, isAgent, isPilot, isEditor }
