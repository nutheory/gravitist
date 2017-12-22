const Rating = `
  type Rating {
    id: ID
    ratableId: ID
    ratable: String
    rating: Int
    createdAt: String
    updatedAt: String
  }

  input RatingInput {
    ratableId: ID
    ratable: String
    rating: Int
  }

  type RatingPayload {
    rating: Rating
  }
`

module.exports = Rating
