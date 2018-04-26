const { createError } = require('./appErrors')
const chalk = require('chalk')

const UnknownError = createError('UnknownError', {
  message: 'An unknown error has occurred'
})

const UnauthorizedError = createError('UnauthorizedError', {
  message: 'You must login to do that'
})

const RobberyInProgressError = ({args, loc}) => new (createError('RobberyInProgressError', {
  message: `Transfer is not reasonable. Please check amount.`,
  name: 'RobberyInProgress',
  args,
  info: loc
}))()

const AuthenticationFailed = ({args, loc}) => new (createError('AuthenticationFailed', {
  message: `Authentication failed. Please check your email and password.`,
  name: 'AuthenticationFailed',
  args,
  info: loc
}))()

const AlreadyAuthenticatedError = createError('AlreadyAuthenticatedError', {
  message: 'An unknown error has occurred'
})

const ForbiddenError = createError('ForbiddenError', {
  message: 'You are not allowed to access that'
})

const CompanyAccessError = (args) => new (createError('CompanyAccess', {
  message: `Your access key is invalid. Please request a key from ${args.name}
  at ${args.email}.`
}))()

const UnknownErrorFF = ({args, loc}) => new (createError('Unknown', {
  message: 'An unknown error has occurred',
  args,
  info: loc
}))()

const NotFoundError = ({args, loc}) => new (createError('NotFound', {
  message: `Not found.`,
  name: 'NotFoundError',
  args,
  info: loc
}))()

const ConstraintError = ({args, loc}) => new (createError('Constraint', {
  message: `DB unique constraint error.`,
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
  console.log(chalk.blue.bold('NAME'), name)
  switch(name) {
    case "AuthenticationFailed": return AuthenticationFailed(args)
    case "SequelizeUniqueConstraintError": return ConstraintError(args)
    case "SequelizeEmptyResultError": return NotFoundError(args)
    case "CompanyAccessError": return CompanyAccessError(args)
    default: return UnknownErrorFF(args)
  }
}

module.exports = {
  UnknownError,
  UnauthorizedError,
  AlreadyAuthenticatedError,
  RobberyInProgressError,
  ForbiddenError,
  NotFoundError,
  UniqueEmailError,
  RequiredFieldsError,
  FailFastError
}
