const validateJS = require("validate.js")
const { RequiredFieldsError, UniqueEmailError } = require("./errors")
const db = require('../models')
const chalk = require('chalk')

var Validate = function(input){

  var missingKeys = []
  var requiredKeys = []
  var promises = []

  var _checkKeys = function(attr, requiredKeys){
    if(requiredKeys){
      requiredKeys.map( keyName => {
        if( !attr[keyName] ){
          missingKeys.push(keyName)
        }
      })
    }
  }

  var isValidUser = function(){
    switch(input.user.type){
      case "agent":
        requiredKeys = [ "email", "name", "password", "stripeToken" ]
        break
      case "pilot":
        requiredKeys = [ "license", "insurance", "email", "name", "password",
          "address", "workRadius", "stripeToken" ]
        break
      case "editor":
        requiredKeys = [ "email", "name", "password", "stripeToken" ]
        break
      case "admin":
        requiredKeys = [ "email", "name", "password" ]
        break
    }
    _checkKeys(input.user, requiredKeys)
    return this
  }

  var isUniqueEmail = function(){
    const lowercaseEmail = input.user.email.toLowerCase()
    const uniqueEmailPromise = db.User.findOne({ where: { email: lowercaseEmail } })
    promises.push(uniqueEmailPromise)
    return this
  }

  const isValidOrder = function(){
    isValidPlan()
    isValidAddress()
    return this
  }

  const isValidPlan = function(){
    const base = input.order
    requiredKeys = ['name', 'actualPrice']
    _checkKeys(input.order.plan, requiredKeys)
    return this
  }

  const isValidAddress = function(){
    const base = input.order
    if(input.order.address){
      requiredKeys = ['address1', 'zipCode', 'city', 'state', 'lat', 'lng' ]
      _checkKeys(input.order.address, requiredKeys)
    }
    return this
  }

  var done = async function(){
    const errors = []
    const [ email ] = await Promise.all(promises)
    if(missingKeys.length > 0){ errors.push( "RequiredFieldsError" )}
    if(email) { errors.push( "UniqueEmailError" ) }
    if(errors.length > 0){ throw errors }
    return this
  }

  return { isValidUser, isValidOrder, isValidPlan, isValidAddress, isUniqueEmail, done }

}

module.exports = { Validate }
