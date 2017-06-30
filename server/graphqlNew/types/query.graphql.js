export default (registry) => {
  registry.createType(`
    type Query {
      user(id: ID!): User
    }
  `)
}
