export default (registry) => {
  registry.createType(`
    type User {
      id: ID
      name: String
      accountId: String
      email: String
      password: String
      type: String
      avatarId: ID
      bio: String
      workRadius: Int
      ratingCount: Int
      rating: String
      payRate: String
    }
  `)
}
