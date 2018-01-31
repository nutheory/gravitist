const { task, waitAll } = require('folktale/concurrency/task')
const R = require('ramda')
const db = require('../models')
const Op = db.Sequelize.Op
const { AuthenticationFailed, UserError, UnauthorizedError, ForbiddenError } = require('../utils/errors')
const { buildOrderOverlay } = require('./assets')
const { recruitingMailer } = require('../mailers/order')
const chalk = require('chalk')

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const log = data =>
  R.tap(console.log(chalk.blue.bold('DATA'), data))

const orderIncludes = queryString => {
  console.log(chalk.blue.bold('QUERY'), queryString)
  return { include: [ { model: db.Address, as: 'address' },
  { model: db.User, as: 'agent', include: [{ model: db.Asset, as: 'avatar' }] },
  { model: db.User, as: 'pilot', include: [{ model: db.Asset, as: 'avatar' }] },
  { model: db.Asset, as: 'assets' }, { model: db.Listing, as: 'listing' } ] } }

const collectionOptions = ({ sortKey, sortValue, sizeLimit, colOffset }) => {
  const obj = {}
  if( sortKey && sortValue ){ obj.order = [[ sortKey, sortValue ]] }
  if( sizeLimit ){ obj.limit = sizeLimit }
  if( colOffset ){ obj.offset = colOffset }
  return obj
}

const getFullOrderInstance = ({id, usr}) => {
  return task(resolver => resolver.resolve(
    db.Order.findOne( R.merge({ where: { id }}, orderIncludes()) )
    .then(res => {
      return { order: res.dataValues }
    }).catch(err => console.log(chalk.blue.bold('ERR'), err))
   ) )
  .run().promise()
}

// May need double merge of params
const getOrdersByCriteria = ({ usr, attrs }) =>
  task(resolver =>
    db.Order.findAll( R.merge({ where: R.mergeAll([ attrs.criteria,
      { [Op.or]: [
        { plan: { [Op.iLike]: `%${attrs.queryString}%` } },
        { status: { [Op.iLike]: `%${attrs.queryString}%` } },
        { receiptId: { [Op.iLike]: `%${attrs.queryString}%` } }
      ] }, usr.type !== "admin" ? { [`${usr.type}Id`]: usr.id } : {} ]) },
      R.merge(orderIncludes(attrs.queryString), collectionOptions(attrs.options))))
      .then(res => {
        console.log(chalk.blue.bold('RES'), res.length)
        resolver.resolve({orders: res})}) )
  .run().promise()

const createOrderWithAssociations = ({ usr, pln, addr }) =>
  db.sequelize.transaction( tx =>
    task( resolver => db.Order.create(
        { agentId: usr.id, plan: pln.name },
        { customer: usr.customerId, pln, transaction: tx })
      .then(ordr => ordr.createAddress(addr, { transaction: tx })
        .then(addr => {
          //
          const createdOrder = R.merge(ordr.dataValues, {address: addr.dataValues})
          return resolver.resolve(createdOrder) } )) )
    .orElse(reason => reason ).run().promise() )
  .catch(err => { throw err })

const getOrderWithAddressToUpdate = ({ usr, id, ordr, addr }) =>
  task( resolver =>
    db.Order.findOne(R.merge({ where: { id }}, orderIncludes))
      .then(async (res) => {
        const pOrdr = res.update(ordr)
        const pOrdrAddrss = res.address.update(addr)
        const [newOrder, newAddress] = await Promise.all([pOrdr, pOrdrAddrss])
        return resolver.resolve(newOrder.dataValues)
      })).run().promise()

const toggleOrderParticipation = ({ usr, id, updates }) =>
  db.sequelize.transaction(tx =>
    task(resolver =>
      db.Order.findById(id, { transaction: tx })
        .then(async (ordr) => ordr.update({
          [`${usr.type}Id`]: ( R.isNil(ordr[`${usr.type}Id`]) ? usr.id :
          ( R.equals(ordr[`${usr.type}Id`], usr.id) ? null : resolver.reject('Already Assigned.'))),
          [`${usr.type}AcceptedAt`]: ( R.isNil(ordr[`${usr.type}AcceptedAt`]) ? new Date() : null ),
          status: updates.status }).then(ordr => resolver.resolve(({ id: ordr.id, usr, ordr, updates })) ) )
     ).orElse(reason => reason ).run().promise() )
  .catch(err => { console.log(chalk.blue.bold("ERRRRRRR"), err) })

const processUploadedOrder = ({ usr, id, updates }) =>
  db.sequelize.transaction(tx =>
    task(resolver =>
      db.Order.findById(id, { include: [ { model: db.Address, as: 'address' },
        { model: db.User, as: 'agent', include: [{ model: db.Asset, as: 'avatar' },
        { model: db.Contact, as: 'contacts' }]} ], transaction: tx })
        .then( async (ordr) => ordr.update({ status: updates.status, uploadedAt: updates.uploadedAt, rawUrl: updates.rawUrl })
        .then( async (res) => {
          console.log('RESSSSS', res)
          const build = await buildOrderOverlay({ usr, ordr: res.dataValues })
          return resolver.resolve({ order: res })
        }))
      ).orElse( reason => reason ).run().promise() )

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
    rawMissionsWithinRadiusSqlQuery({ usr, qryPrms }).spread((res, meta) =>
      res.map(result => processMissionResults(result))) ))
  .run().promise()

const queryPilotsWithinRadius = ({ ordr, qryPrms }) =>
  task(resolver => rawPilotsWithinRadiusSqlQuery({ ordr, qryPrms }).then(res => {
    console.log('PilotsWithinRadius RES', res)
    resolver.resolve({users: res}) }) )
  .run().promise()


const notifyLocalPilots = async ({ ordr }) => {
  const pilots = await queryPilotsWithinRadius({ ordr })
  pilots.forEach(pilot => {
    recruitingMailer({ pilot, order: ordr })
  })
}

const rawMissionsWithinRadiusSqlQuery = ({ usr, qryPrms }) => db.sequelize.query(`
  SELECT
    "order"."id", "order"."status", "order"."agentId",
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
    ${usr.workRadius * 1000.34}) @> ll_to_earth("address".lat, "address".lng)
  ORDER BY
    "${qryPrms.sortKey}" ${qryPrms.sortValue}
  LIMIT
    ${qryPrms.sizeLimit} OFFSET ${qryPrms.colOffset}`)

const rawPilotsWithinRadiusSqlQuery = ({ ordr, qryPrms }) => db.sequelize.query(`
  SELECT
    "user"."id", "user"."type", "user"."email", "user"."name", "user"."accountId",
    "user"."termsAccepted", "user"."isVerified", "user"."workRadius", "address"."address1"
    AS "address.address1", "address"."address2" AS "address.address2", "address"."city"
    AS "address.city", "address"."state" AS "address.state", "address"."zipCode"
    AS "address.zipCode", "address"."type" AS "address.type", "address"."lat"
    AS "address.lat", "address"."lng" AS "address.lng",
    ( earth_distance(
        ll_to_earth("address"."lat", "address"."lng"),
        ll_to_earth(${ordr.address.lat}, ${ordr.address.lng})
        ) / 1609.34
    ) AS "distanceFromLocation"
  FROM
    "Users" AS "user"
    LEFT JOIN "Addresses" AS "address" ON "user"."id" = "address"."addressableId"
    AND "address"."addressable" = 'user'
  WHERE
    "user"."type" = 'pilot'
    AND "user"."isVerified" = '1'
    AND "user"."accountId" IS NOT NULL
    AND "user"."termsAccepted" = '1'
    AND earth_box(ll_to_earth("address"."lat", "address"."lng"),
    "user"."workRadius" * 1000.34) @> ll_to_earth(${ordr.address.lat}, ${ordr.address.lng})`)

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const create = R.tryCatch(R.pipeP(createOrderWithAssociations),log)
const update = R.tryCatch(R.pipeP(getOrderWithAddressToUpdate),log)
const destroy = R.tryCatch(R.pipeP(destroyOrderWithAssociated),log)
const missions = R.tryCatch(R.pipeP(queryMissionsWithinRadius),log)
const order = getFullOrderInstance
const orders = getOrdersByCriteria

const joinOrLeave = toggleOrderParticipation
const uploaded = processUploadedOrder

module.exports = {
  create,
  update,
  joinOrLeave,
  orders,
  order,
  missions,
  uploaded,
  destroy
}
