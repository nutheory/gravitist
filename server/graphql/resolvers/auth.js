import Auth from '../../services/auth'
import {getLoggedInUser} from './users'
const auth = new Auth

export const authenticated =
  (fn: GraphQLFieldResolver) =>
    (parent, args, context, info) => {
      console.log(fn)

      if (context.user) {
        console.log('CCCCCCCONTEXT')
        return fn(parent, args, context, info)
      }
      throw new Error('User is not authenticated')
    }

export const login = (root, args, req) => {
  const loggedIn = auth.login({
    email: args.input.email,
    password: args.input.password,
    req
  })
  return loggedIn
}


// }

// export default AuthResolver
