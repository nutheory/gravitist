const AppError = require('./appErrors').createAppError

const mustHaveId = (id) => {
  try{
    if (!id){
      throw( AppError( {
        type: `Utils.MissingID`,
        message: `Missing required ID.`
      } ) )
    }
  }
  catch(e){
    return e
  }
  return id
}

module.exports = { mustHaveId }
