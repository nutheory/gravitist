
export const getLoggedInUser = (parent, args, context, info) => {
  console.log('context2',context)
  return context.user
}
