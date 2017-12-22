const { createError } = require('./appErrors')

const UnknownError = createError('UnknownError', {
  message: 'An unknown error has occurred'
})

const UnauthorizedError = createError('UnauthorizedError', {
  message: 'You must login to do that'
})

const AuthenticationFailed = createError('AuthenticationFailed', {
  message: 'Authentication failed. Please check your username and password.'
})

const AlreadyAuthenticatedError = createError('AlreadyAuthenticatedError', {
  message: 'An unknown error has occurred'
})

const ForbiddenError = createError('ForbiddenError', {
  message: 'You are not allowed to access that'
})

const CompanyAccessError = (args) => new (createError('CompanyAccessError', {
  message: `Your access key is invalid. Please request a key from ${args.name}
  at ${args.email}.`
}))()

const UnknownErrorFF = ({args, loc}) => new (createError('UnknownError', {
  message: 'An unknown error has occurred',
  args,
  info: loc
}))()

const NotFoundError = ({args, loc}) => new (createError('NotFoundError', {
    message: `Not found.`,
    args,
    info: loc
}))()

const RequiredFieldsError = (fieldsArr) => createError('RequiredFieldsError', {
    message: `Missing required field(s) ${ fieldsArr }. Please complete all fields`
})

const UniqueEmailError = createError('UniqueEmailError', {
    message: "Email Address already exists, please login instead."
})

const FailFastError = (name, args) => {
  switch(name) {
    case "SequelizeEmptyResultError": return NotFoundError(args)
    case "CompanyAccessError": return CompanyAccessError(args)
    default: return UnknownErrorFF(args)
  }
}

module.exports = {
  UnknownError,
  UnauthorizedError,
  AlreadyAuthenticatedError,
  ForbiddenError,
  UniqueEmailError,
  RequiredFieldsError,
  FailFastError
}
