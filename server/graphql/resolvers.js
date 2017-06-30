import {compose} from 'recompose'
import Order from './resolvers/orders'
import Address from './resolvers/addresses'
import {getLoggedInUser} from './resolvers/users'
import {authenticated, login} from './resolvers/auth'

const resolvers = {
  Query: {
    user: compose(authenticated)(getLoggedInUser),
      // console.log('context',context.user)
      // return context.user
    // },
    orders: () => {
      return "hey"
    },
  },
  Mutation: {
    login: (login)
  }
}
export default resolvers
