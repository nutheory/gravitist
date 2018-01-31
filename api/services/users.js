const { task, of, waitAll } = require('folktale/concurrency/task')
const Result = require('folktale/result')
const compose = require('folktale/core/lambda/compose')
const { chain, map } = require('folktale/fantasy-land')
const R = require('ramda')
const db = require('../models')
const Op = db.Sequelize.Op
const { createError } = require('../utils/appErrors')
const { retrieveCustomer, addCustomerSource } = require('./payments')
const { FailFastError } = require('../utils/errors')
const chalk = require('chalk')

const capitalize = str =>
  str.charAt(0).toUpperCase() + str.slice(1)

const userInclude = (criteria) => {
  if(criteria && criteria.type === "pilot"){
    return { include: [{ model: db.Address, as: 'address' }, { model: db.Asset, as: 'avatar' },
      { model: db.Asset, as: 'insurance' }, { model: db.Asset, as: 'license' },
      { model: db.Contact, as: 'contacts' }] }
  } else {
    return { include: [{ model: db.Address, as: 'address' }, { model: db.Asset, as: 'avatar' },
    { model: db.Contact, as: 'contacts' }] }
  }
}

const userIncludes = (criteria) => {
  if( criteria && criteria.type === "pilot"){
    return { include: [{ model: db.Address, as: 'address' }, { model: db.Asset, as: 'avatars' },
      { model: db.Asset, as: 'insurances' }, { model: db.Asset, as: 'licenses' },
      { model: db.Contact, as: 'contacts' }] }
  } else {
    return { include: [{ model: db.Address, as: 'address' }, { model: db.Asset, as: 'avatars' },
    { model: db.Contact, as: 'contacts' }] }
  }
}

const collectionOptions = ({ sortKey, sortValue, sizeLimit, colOffset }) => {
  const obj = {}
  if( sortKey && sortValue ){ obj.order = [[ sortKey, sortValue ]] }
  if( sizeLimit ){ obj.limit = sizeLimit }
  if( colOffset ){ obj.offset = colOffset }
  return obj
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const log = data => R.tap(() => console.log(chalk.blue.bold('DATA'), data), data)

const getFullUser = findBy =>
  task(resolver =>
    db.User.findOne({ where: (findBy.id ? { id: findBy.id  } : { email: findBy.email.toLowerCase() } ),
      rejectOnEmpty: true, include: [{ model: db.Address, as: 'address' }, { model: db.Asset, as: 'avatars' },
        { model: db.Asset, as: 'insurances' }, { model: db.Asset, as: 'licenses' },
        { model: db.Contact, as: 'contacts' }] })
      .then(res => resolver.resolve({ usr: res, auth: findBy }) )
      .catch(err => resolver.reject(FailFastError(err.name, { args: findBy, loc: 'Service: User.getFullUser' }))) )
  .run().promise()

const getCoreUser = ({ usr, attrs }) =>
  task(resolver =>
    db.User.find({ where: { id: attrs.id }, rejectOnEmpty: true,
      include: [{ model: db.Address, as: 'address' }, { model: db.Contact, as: 'contacts' }] })
      .then(usr => resolver.resolve({ usr, attrs }) )
      .catch(err => resolver.reject(FailFastError(err.name, { args: attr, loc: 'Service: User.getCoreUser' }))) )
  .run().promise()

const getUser = attrs =>
  task(resolver =>
    db.User.find({ where: { id: attrs.id }, rejectOnEmpty: true })
      .then(usr => resolver.resolve({ usr, attrs }))
      .catch(err => resolver.reject(FailFastError(err.name, { args: attrs, loc: 'Service: User.getUser' }))) )
  .run().promise()

const getUsersByCriteria = attrs =>
  task(resolver =>
    db.User.findAll(R.merge({ where: R.merge(attrs.criteria,
      { [Op.or]: [
        { name: { [Op.iLike]: `%${attrs.queryString}%` } },
        { email: { [Op.iLike]: `%${attrs.queryString}%` } },
        { customerId: { [Op.iLike]: `%${attrs.queryString}%` } },
        { accountId: { [Op.iLike]: `%${attrs.queryString}%` } }
      ] }) }, R.merge(userIncludes(attrs.criteria), collectionOptions( attrs.options))))
      .then(users => resolver.resolve({ users }))
      .catch(err => resolver.reject(FailFastError(err.name, { args: attrs, loc: 'Service: User.getUser' }))) )
  .run().promise()

const contactAssociations = async (asscConts) => {
  if(asscConts.contacts && asscConts.contacts.length > 0){
    const contacts = []
    asscConts.contacts.map(contact => {
      if(contact.status === "delete"){
        contacts.push( task(resolver =>
          db.Contact.destroy({ where: { id: contact.id }, transaction: asscConts.tx })
            .then(res => resolver.resolve(res.dataValues))))
      } else if(contact.status === "new"){
        contacts.push( task(resolver =>
          asscConts.usr.createContact({ type: contact.type, content: contact.content,
            default: contact.default }, { transaction: asscConts.tx })
          .then(res => resolver.resolve(res.dataValues))))
      } else {
        contacts.push( task(resolver =>
          db.Contact.update({ type: contact.type, content: contact.content, default: contact.default },
            { where: { id: contact.id }, transaction: asscConts.tx })
            .then(res => resolver.resolve(res.dataValues))))
      }})
    const result = await waitAll(contacts).run().promise()
    console.log(chalk.blue.bold("err con"),result)
    return { contacts: result }
  }
}

const createAssociations = (assc) => {
  const tasks = []
  R.keys(assc.attrs).map(attr =>
    tasks.push( task(resolver => {
      assc.usr['create' + capitalize(attr)](assc.attrs[attr], { transaction: assc.tx })
      .then(res => resolver.resolve({ [attr]: res.dataValues }))})))
  return waitAll(tasks).run().promise()
}

const createUserWithAssociations = attrs =>
  db.sequelize.transaction(tx =>
    task(resolver =>
      db.User.create(attrs, { stripeToken: attrs.stripeToken, transaction: tx })
      .then(async (usr) => {
        const addressPromise = attrs.address ? usr.createAddress(attrs.address, { transaction: tx }) : []
        const contactsPromises = attrs.contacts ? contactAssociations({usr, contacts: attrs.contacts, tx}) : []
        const [address, contacts] = await Promise.all([addressPromise, contactsPromises])
        resolver.resolve(usr.dataValues)
      }))
    .orElse(reason => reason ).run().promise() ).catch(err => { console.log(chalk.blue.bold("err "),err) })

const updateAssociations = ({ usr, attrs }) => {
  return db.sequelize.transaction(tx =>
    task(async (resolver) => {
      const addressPromise = attrs.user.address ? usr.address.updateAttributes(attrs.user.address, { transaction: tx }) : []
      const contactsPromises = attrs.user.contacts ? contactAssociations({usr, contacts: attrs.user.contacts, tx}) : []
      const [address, contacts] = await Promise.all([addressPromise, contactsPromises])
      resolver.resolve(attrs)
    })
    .orElse( reason => reason ).run().promise() ).catch(err => { throw err })
  }

const updateUser = ({ usr, attrs }) =>
  db.sequelize.transaction(tx =>
    task(resolver =>
      usr.update(attrs.user, { tx })
        .then(usr => resolver.resolve({ usr, attrs }))
        .catch(err => { throw err }))
    .orElse( reason => reason ).run().promise() ).catch(err => { throw err })

const validateIncomingPassword = async ({ usr, auth }) =>
  await usr.comparePassword(auth.password).then(res => {
    console.log(chalk.blue.bold("RES"),res)
    if(res){
      return { usr }
    } else {
      throw new Error(FailFastError("AuthenticationFailed", { args: auth, loc: 'Service: User.validateIncomingPassword' }))
    }
  }).catch(err => {
    console.log(chalk.blue.bold("ERR"),err) 
    throw err })
    // FailFastError("AuthenticationFailed", { args: auth, loc: 'Service: User.validateIncomingPassword' }) )
    // .catch(err => err))

// const sendEmailConfirmationToUser = (userObj) =>
//   userObj

const returnTokenAndUserInfo = userObj => {
  return db.User.createAndReturnToken(userObj)
}

const destroyUser = ({ usr }) => {
  const cl = R.clone(usr)
  return task(resolver =>
    usr.destroy()
    .then(res => resolver.resolve({ usr: cl }))
    .catch(err => resolver.reject(FailFastError(err.name, { args: cl, loc: 'Service: User.destroyUser' }))) )
  .run().promise()
}

const returnUser = ({ usr }) => {
  return { user: usr.dataValues }}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const profile = R.pipeP(
  getFullUser,
  returnUser
)

const collection = getUsersByCriteria

const login = R.pipeP(
  getFullUser,
  validateIncomingPassword,
  returnTokenAndUserInfo
)

const create = R.pipeP(
  createUserWithAssociations,
  getFullUser,
  returnTokenAndUserInfo
)

const update = R.pipeP(
  getUser,
  updateUser,
  getCoreUser,
  updateAssociations,
  getFullUser,
  returnTokenAndUserInfo
)

const destroy = R.pipeP(
  getUser,
  destroyUser,
  returnUser
)

const verify = R.pipeP(
  getUser,
  updateUser,
  returnUser
)

const refresh = R.pipeP(
  getUser,
  returnUser
)

module.exports = { create, update, verify, destroy, profile, login, refresh, collection }
