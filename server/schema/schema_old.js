// import {
//   GraphQLSchema,
//   GraphQLObjectType,
//   GraphQLNonNull,
//   GraphQLInt,
//   GraphQLString,
//   GraphQLList
// } from 'graphql'
// import Db from '../models/index'
//
//
//
//
// const OrderType = new GraphQLObjectType({
//   name: 'Address',
//   description: '...',
//
//   fields:({
//     pilotId: {type: GraphQLString},
//     addressId: {type: GraphQLString},
//     receiptId: {type: GraphQLString},
//     status: {type: GraphQLString},
//     userId: {type: GraphQLString},
//     timeOfDay: {type: GraphQLString},
//     resolve() {
//
//     }
//   })
// })
//
// const QueryType = new GraphQLObjectType({
//   name: 'Query',
//   description: '...',
//
//   fields: ({
//     address: {
//       type: AddressType,
//       args: {
//         id: {
//           description: "id of the address",
//           type: new GraphQLNonNull(GraphQLString)
//         }
//       },
//     },
//     users: {
//       type: new GraphQLList(UserType),
//       args: {
//         id: { type: GraphQLInt },
//         email: { type: GraphQLString }
//       },
//       resolve(users) {
//         // Db.models.user.findAll(where: args)
//         console.log("DB", Db.models.user)
//       }
//     }
//   })
// })
//
// export default new GraphQLSchema({
//   query: QueryType,
// })
