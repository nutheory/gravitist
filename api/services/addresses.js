const _ = require('lodash')
const config = require('../config')
const Db = require('../models')
const Address = Db.sequelize.models.address
const AppError = require('../utils/appErrors').createAppError

function validateAddressInput( input ){
  let expectedKeys = [ "address1", "state", "city", "zipCode", "lat", "lng" ]

  try{
    _.forIn(expectedKeys, ( key, idx ) => {
      if (!input[key]){
        throw( AppError( {
          type: `User.Create`,
          message: `Missing required field ${key}.`
        } ) )
      }
    })
  }
  catch(e){
    throw e
  }
  return input
}

async function createAddress( addressAttributes, req ){
  const address = await Address.create(addressAttributes)
  return address
}

async function destroyAddress( addressId, req ){
  const result = await Address.findById( addressId )
    .then(res => {
      res.destroy()
    })
}


module.exports = { createAddress, validateAddressInput }
