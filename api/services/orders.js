const { task, waitAll } = require('folktale/concurrency/task')
const R = require('ramda')
const db = require('../models')
const Op = db.Sequelize.Op
const { AuthenticationFailed, UserError, UnauthorizedError, ForbiddenError } = require('../utils/errors')
const chalk = require('chalk')

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const log = data =>
  R.tap(console.log(chalk.blue.bold('DATA'), data))

const orderIncludes = { include: [ { model: db.Address, as: 'address' },
  { model: db.User, as: 'agent' }, { model: db.User, as: 'pilot' },
  { model: db.User, as: 'editor' }, { model: db.Asset, as: 'assets' } ] }

const collectionOptions = ({ sortKey, sortValue, sizeLimit, colOffset }) => {
  const obj = {}
  if( sortKey && sortValue ){ obj.order = [[ sortKey, sortValue ]] }
  if( sizeLimit ){ obj.limit = sizeLimit }
  if( colOffset ){ obj.offset = colOffset }
  return obj
}

const getFullOrderInstance = ({id, usr}) => {
  console.log(chalk.blue.bold('ID'), id)
  console.log(chalk.blue.bold('USR'), usr)
  return task(resolver => resolver.resolve(
    db.Order.findOne( R.merge({ where: { id }}, orderIncludes) )
    .then(res => {
      console.log(chalk.blue.bold('RES'), res)
      return { order: res.dataValues }
    }).catch(err => console.log(chalk.blue.bold('ERR'), err))
   ) )
  .run().promise()
}

const getCollectionOfUserOrders = ({ usr, qryPrms }) =>
  task(resolver =>
    db.Order.findAll( R.merge({ where: { [`${usr.type}Id`]: usr.id }},
      orderIncludes, collectionOptions(qryPrms)))
    .then(res => resolver.resolve(res)) )
  .run().promise()

const createOrderWithAssociations = ({ usr, pln, addr }) =>
  db.sequelize.transaction( tx =>
    task( resolver => resolver.resolve( db.Order.create(
        { agentId: usr.id, plan: pln.name },
        { customer: usr.customerId, pln, transaction: tx })
      .then(ordr => ordr.createAddress(addr, { transaction: tx })
        .then(addr => R.merge(ordr.dataValues, {address: addr.dataValues}) )) ))
    .orElse(reason => reason ).run().promise() )
  .catch(err => { throw err })

const getOrderToUpdate = ({ usr, id, updates }) =>
  db.Order.findById(id).then( ordr => ({ usr, ordr, updates }) ).catch(err => { throw err })

const getOrderWithAddressToUpdate = ({ usr, id, updates }) =>
  db.Order.find({ where: { id: id }})
    .then( ordr => ordr.getAddress()
      .then( addr => ({ usr, ordr, addr, updates }) )).catch(err => { throw err })

const toggleOrderParticipation = ({ usr, ordr, updates }) =>
  db.sequelize.transaction(tx =>
    task(resolver => ordr.update({
      [`${usr.type}Id`]: ( R.isNil(ordr[`${usr.type}Id`]) ? usr.id :
        ( R.equals(ordr[`${usr.type}Id`], usr.id) ? null : resolver.reject('Already Assigned.'))),
      [`${usr.type}AcceptedAt`]: ( R.isNil(ordr[`${usr.type}AcceptedAt`]) ? new Date() : null ),
        status: updates.status }).then(ordr => resolver.resolve(({ id: ordr.id,  usr, ordr, updates })) ) )
    .orElse(reason => reason ).run().promise() )
  .catch(err => { console.log(chalk.blue.bold("ERRRRRRR"), err) })

const updateOrderWithAssociations = async ({ usr, ordr, addr, updates }) =>
  db.sequelize.transaction(tx =>
    task(resolver => resolver.resolve(
      ordr.update(updates, { fields: db.Order.updateFields(usr.type), transaction: tx })
      .then(uOrdr => addr.update(updates.address, { fields: db.Address.updateFields(), transaction: tx })
        .then(uAddr => R.merge(uOrdr.dataValues, {address: uAddr.dataValues}) )) ))
    .orElse(reason => reason ).run().promise() )
  .catch(err => { throw err })


const destroyOrderWithAssociated = (id) =>
  task(async (resolver) => {
    const ordr = await db.Order.findOne({ where: { id }, include: [ { model: db.Address, as: 'address' } ] })
    const destroyed = ordr.dataValues
    ordr.destroy().catch(err => { throw err })
    resolver.resolve({ order: { plan: ordr.plan, receiptId: ordr.receiptId, address: ordr.address } }) })
  .run().promise()

const splitDbColumnOnDot = key => key[0].split('.').concat(key[1])
const createObjFromArrayUsingPath = (arr) => R.assocPath(R.init(arr), R.last(arr), {})
const mapOverPairsOfObj = pairs => R.map(buildProperJSONFromRawSqlQuery, pairs)
const recursivelyMergeAllCols = col => R.reduce(R.mergeWith(R.merge), {}, col)
const buildProperJSONFromRawSqlQuery = R.pipe( splitDbColumnOnDot, createObjFromArrayUsingPath )
const processMissionResults = R.pipe( R.toPairs, mapOverPairsOfObj, recursivelyMergeAllCols )

const queryMissionsWithinRadius = ({ usr, qryPrms }) =>
  task(resolver => resolver.resolve(
    rawSqlQuery({ usr, qryPrms }).spread((res, meta) =>
      res.map(result => processMissionResults(result))) ))
  .run().promise()

const rawSqlQuery = ({ usr, qryPrms }) => db.sequelize.query(`
  SELECT
    "order"."id", "order"."status",
    "order"."plan", "order"."createdAt", "order"."completedAt", "order"."pilotAcceptedAt",
    "order"."editorAcceptedAt", "agent"."id" AS "agent.id","agent"."name" AS "agent.name",
    "agent"."email" AS "agent.email", "address"."address1" AS "address.address1",
    "address"."address2" AS "address.address2", "address"."city" AS "address.city",
    "address"."state" AS "address.state", "address"."zipCode" AS "address.zipCode",
    "address"."type" AS "address.type", "address"."lat" AS "address.lat",
    "address"."lng" AS "address.lng", "address"."createdAt" AS "address.createdAt",
    "address"."updatedAt" AS "address.updatedAt",
    ( earth_distance(
        ll_to_earth(${usr.address.lat}, ${usr.address.lng}),
        ll_to_earth("address".lat, "address".lng)
      ) / 1609.34
    ) AS "distanceFromLocation"
  FROM
    "Orders" AS "order"
    LEFT OUTER JOIN "Users" AS "agent" ON "order"."agentId" = "agent"."id"
    LEFT OUTER JOIN "Addresses" AS "address" ON "order"."id" = "address"."addressableId"
    AND "address"."addressable" = 'order'
  WHERE
    "order"."pilotId" IS NULL
    AND earth_box(ll_to_earth(${usr.address.lat}, ${usr.address.lng}),
    ${usr.workRadius * 1609.34}) @> ll_to_earth("address".lat, "address".lng)
  ORDER BY
    "${qryPrms.sortKey}" ${qryPrms.sortValue}
  LIMIT
    ${qryPrms.sizeLimit} OFFSET ${qryPrms.colOffset}`)

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const create = R.tryCatch(R.pipeP(createOrderWithAssociations),log)
const destroy = R.tryCatch(R.pipeP(destroyOrderWithAssociated),log)
const missions = R.tryCatch(R.pipeP(queryMissionsWithinRadius),log)
const order = getFullOrderInstance
const orders = getCollectionOfUserOrders

const update = R.tryCatch(R.pipeP(
    getOrderWithAddressToUpdate,
    updateOrderWithAssociations
  ),log)

const joinOrLeave = R.tryCatch(R.pipeP(
    getOrderToUpdate,
    toggleOrderParticipation,
    getFullOrderInstance
  ),log)

module.exports = { create, update, joinOrLeave, orders, order, missions, destroy }
