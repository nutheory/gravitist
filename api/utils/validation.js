const validateJS = require("validate.js")
const { RequiredFieldsError, UniqueEmailError } = require("./errors")
const db = require('../models')
const chalk = require('chalk')

const Validate = (input) => {

  const missingKeys = []
  const requiredKeys = []
  const errors = []

  const checkKeys = function(attr, requiredKeys){
    if(requiredKeys){
      requiredKeys.map( keyName => {
        if( !attr[keyName] ){
          missingKeys.push(keyName)
        }
      })
    }
  }

  const isValidUser = () => {
    switch(input.user.type){
      case "agent":
        requiredKeys = [ "email", "name", "password", "contacts", "stripeToken" ]
        break
      case "pilot":
        requiredKeys = [ "email", "name", "password", "contacts", "workRadius" ]
        break
      case "editor":
        requiredKeys = [ "email", "name", "password" ]
        break
      case "admin":
        requiredKeys = [ "email", "name", "password" ]
        break
      case "unapproved_editor":
        requiredKeys = [ "email", "name", "password" ]
        break
      case "unapproved_admin":
        requiredKeys = [ "email", "name", "password" ]
        break
    }
    checkKeys(input.user, requiredKeys)
  }

  const isUniqueEmail = async () =>{
    console.log(chalk.blue.bold('input.useremail'), inp)
    console.log(chalk.blue.bold('this'), this)
    const lowercaseEmail = input.user.email.toLowerCase()
    const uniqueEmail = await db.User.findOne({ where: { email: lowercaseEmail } })
    console.log(chalk.blue.bold('uniqueEmail'), uniqueEmail)
  }

  const isValidOrder = () => {
    isValidPlan()
    isValidAddress()
  }

  const isValidPlan = () => {
    const base = input.order
    requiredKeys = ['name', 'actualPrice']
    checkKeys(input.order.plan, requiredKeys)
  }

  const isValidAddress = () => {
    const base = input.order
    if(input.order && input.order.address){
      requiredKeys = ['address1', 'zipCode', 'city', 'state', 'lat', 'lng' ]
      checkKeys(input.order.address, requiredKeys)
    }
  }

  const done = () => {
    console.log(chalk.blue.bold('[ email.id ]'), email.id)
    if(missingKeys.length > 0){ errors.push( "RequiredFieldsError" )}
    if(email.id) { errors.push( "UniqueEmailError" ) }
    console.log(chalk.blue.bold('[ errors ]'), errors)
    // if(errors.length > 0){ throw errors }
  }

  return { isValidUser, isValidOrder, isValidPlan, isValidAddress, isUniqueEmail, done }

}

module.exports = { Validate }
