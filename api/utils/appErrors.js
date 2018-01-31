const assert = require('assert')
const ExtendableError = require('es6-error')
const chalk = require('chalk')

const isString = d => Object.prototype.toString.call(d) === '[object String]'
const isObject = d => Object.prototype.toString.call(d) === '[object Object]'

class ApolloError extends ExtendableError {
  constructor (name, {
    message,
    time_thrown = (new Date()).toISOString(),
    info,
    args,
    data = {},
    options = {},
  }) {
    const t = (arguments[2] && arguments[2].time_thrown) || time_thrown
    const d = Object.assign({}, data, ((arguments[2] && arguments[2].data) || {}))
    const m = (arguments[2] && arguments[2].message) || message
    const i = info
    const a = args
    const opts = Object.assign({}, options, ((arguments[2] && arguments[2].options) || {}))

    super(m)

    this.name = name
    this.message = m
    this.info = i
    this.args = a
    this.time_thrown = t
    this.data = d
    this._showLocations = !!opts.showLocations
  }
  serialize() {
    const { name, message, info, args, time_thrown, data, _showLocations, path, locations } = this

    let error = {
      message,
      name,
      info,
      args,
      time_thrown,
      data,
    }

    if (_showLocations) {
      error.locations = locations
      error.path = path
    }
    
    return error
  }

}

const isInstance = e => e instanceof ApolloError

const createError = (name, config) => {
  assert(isObject(config), 'createError requires a config object as the second parameter')
  assert(isString(config.message), 'createError requires a "message" property on the config object passed as the second parameter')
  const e = ApolloError.bind(null, name, config)
  return e
}

const formatError = (error, returnNull = false) => {
  const originalError = error ? error.originalError || error : null

  if (!originalError) return returnNull ? null : error

  const { name } = originalError
  if (!name || !isInstance(originalError)) return returnNull ? null : error
  const { time_thrown, message, data, _showLocations } = originalError

  if (_showLocations) {
    const { locations, path } = error
    originalError.locations = locations
    originalError.path = path
  }

  return originalError.serialize()
}

module.exports = { isInstance, createError, formatError }
