const { task, of, waitAll } = require('folktale/concurrency/task')
const Result = require('folktale/result')
const compose = require('folktale/core/lambda/compose')
const { chain, map } = require('folktale/fantasy-land')
const R = require('ramda')
const db = require('../models')
const { createError } = require('../utils/appErrors')
const { retrieveCustomer, addCustomerSource } = require('../services/payments')
const { FailFastError } = require('../utils/errors')
const chalk = require('chalk')

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const log = data => R.tap(() => console.log(chalk.blue.bold('DATA'), data), data)

const getFullUser = findBy =>
  task(resolver =>
    db.User.findOne({ where: (findBy.id ? { id: findBy.id  } : { email: findBy.email.toLowerCase() } ),
      rejectOnEmpty: true, include: [{ model: db.Address, as: 'address' }, { model: db.Asset, as: 'avatar' },
      { model: db.Asset, as: 'insurance' }, { model: db.Asset, as: 'license' },
      { model: db.Contact, as: 'contacts' }] })
    .then(res => resolver.resolve({ usr: res, auth: findBy }) )
    .catch(err => resolver.reject(FailFastError(err.name, { args: findBy, loc: 'Service: User.getFullUser' }))) )
  .run().promise()

const getUser = attrs =>
  task(resolver =>
    db.User.find({ where: { id: attrs.id }, rejectOnEmpty: true, include: [{ model: db.Contact, as: 'contacts' }] })
      .then(usr => resolver.resolve({usr, attrs}))
      .catch(err => resolver.reject(FailFastError(err.name, { args: attrs, loc: 'Service: User.getUser' }))) )
  .run().promise()

const getAsscAccessorName = asscName =>
  'create' + asscName.charAt(0).toUpperCase() + asscName.slice(1)

const buildContactAssociations = async (asscConts) => {
  const contacts = []
  asscConts.contacts.map(contact =>
    contacts.push( task(resolver =>
      asscConts.usr.createContact(contact, { transaction: asscConts.tx })
      .then(res => resolver.resolve(res.dataValues)))))
  const result = await waitAll(contacts).run().promise()
  return { contacts: result }
}

const buildAssociations = async (assc) => {
  const tasks = []
  R.keys(assc.attrs).map(attr =>
    tasks.push( task(resolver =>
      assc.usr[getAsscAccessorName(attr)](assc.attrs[attr], { transaction: assc.tx })
      .then(res => resolver.resolve({ [attr]: res.dataValues })))))
  return await waitAll(tasks).run().promise()
}

const createUserWithAssociations = attrs =>
  db.sequelize.transaction(tx =>
    task(resolver =>
      db.User.create(attrs, { stripeToken: attrs.stripeToken, transaction: tx })
      .then(async (usr) =>
        ({ usr, assc: await buildAssociations({usr, attrs: R.pick(['avatar', 'address', 'insurance', 'license'], attrs), tx })}))
      .then(async ({ usr, assc }) =>
        ({ usr, assc: await assc.concat(buildContactAssociations({usr, contacts: R.pathOr([], ['user', 'contacts'], attrs), tx}))}))
      .then(res => resolver.resolve(res)))
    .orElse(reason => reason ).run().promise() ).catch(err => { throw err })

const updateUserWithAssociations = ({ usr, attrs }) =>
  db.sequelize.transaction(tx =>
    task(resolver =>
      usr.update(attrs.user, { fields: db.User.updateFields(attrs.user.type), tx })
      .then(async (usr) =>
        ({usr, assc: await buildAssociations({usr, attrs: R.pick(['avatar', 'address', 'insurance', 'license'], attrs.user), tx})}))
      .then(async ({usr, assc}) => {
        await usr.contacts.map((ct) => ct.destroy())
        return { usr, assc: await assc.concat(buildContactAssociations({usr, contacts: R.pathOr([], ['user', 'contacts'], attrs), tx}))}})
      .then(res => resolver.resolve(res)).catch(err => { throw err }))
    .orElse(reason => reason ).run().promise() ).catch(err => { throw err })

const validateIncomingPassword = async ({ usr, auth }) =>
  await usr.comparePassword(auth.password).then(res => (res ? usr.dataValues : AuthenticationFailed))
    .catch(err => { throw err })

const mergeAllUserInfo = ({ usr, assc }) =>
  R.merge(usr.dataValues, R.mergeAll(assc))

// const sendEmailConfirmationToUser = (userObj) =>
//   userObj

const returnTokenAndUserInfo = userObj =>
  db.User.createAndReturnToken(userObj)

const destroyUser = ({ usr }) => {
  const cl = R.clone(usr)
  return task(resolver =>
    usr.destroy()
    .then(res => resolver.resolve({ usr: cl }))
    .catch(err => resolver.reject(FailFastError(err.name, { args: cl, loc: 'Service: User.destroyUser' }))) )
  .run().promise()
}

const returnUser = ({ usr }) => {
  // console.log(chalk.blue.bold('hgkgk'), usr)
  return { user: usr.dataValues }}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const profile = R.pipeP(
  getFullUser,
  returnUser
)

const login = R.pipeP(
  getFullUser,
  validateIncomingPassword,
  returnTokenAndUserInfo
)

const create = R.pipeP(
  createUserWithAssociations,
  mergeAllUserInfo,
  returnTokenAndUserInfo
)

const update = R.pipeP(
  getUser,
  updateUserWithAssociations,
  mergeAllUserInfo,
  returnTokenAndUserInfo
)

const destroy = R.pipeP(
  getUser,
  destroyUser,
  log,
  returnUser
)

module.exports = { create, update, destroy, profile, login }
