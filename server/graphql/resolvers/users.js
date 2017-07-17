
const getLoggedInUser = (parent, args, context, info) => {
  return context.user
}

module.exports = getLoggedInUser
