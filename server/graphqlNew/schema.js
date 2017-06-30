import { GraphQLSchema } from 'graphql'
import { Registry } from 'graphql-helpers'
import * as graphQLModules from 'glob:./types/*.graphql.js'

const registry = new Registry()

Object.keys(graphQLModules).map(key => graphQLModules[key](registry));

const schema = new GraphQLSchema({
  query: registry.getType('Query'),
  mutation: registry.getType('Mutation')
})
