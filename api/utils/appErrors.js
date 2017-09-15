const util = require('util')

function createAppError( settings ){
  return( new AppError( settings, createAppError ) )
}

function AppError( settings, implementationContext ){
  settings = settings || {}

  this.name            = "AppError"
  this.type            = settings.type || "Application"
  this.message         = settings.message || "An Error Occurred"
  this.detail          = settings.detail || ""
  this.extendedInfo    = settings.extendedInfo || ""
  this.errorCode       = settings.errorCode || ""

  this.isAppError = true

  Error.captureStackTrace(this, implementationContext, AppError)
}

util.inherits( AppError, Error )

module.exports = { AppError, createAppError }
