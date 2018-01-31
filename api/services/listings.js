const { task } = require('folktale/concurrency/task')
const { clone, tryCatch, pipeP, tap } = require('ramda')
const db = require('../models')
const chalk = require('chalk')


const log = data =>
  tap(console.log(chalk.blue.bold('DATA'), data))

const create = attrs =>
  db.sequelize.transaction(tx =>
    task(resolver => db.Listing.create(attrs, { transaction: tx })
      .then(res => resolver.resolve({ listing: res.dataValues }))
    ).run().promise() )

const getListing = ({ id, listing }) =>
  task(resolver => db.Listing.find({ where: { id } })
    .then(res => resolver.resolve({ lst: res, updates: listing }))
  ).run().promise()

const updateListing = ({ lst, updates }) => {
  console.log(chalk.blue.bold('LST'), lst)
  return db.sequelize.transaction(tx =>
    task(resolver => lst.update(updates, { transaction: tx })
      .then(res => resolver.resolve({ listing: res.dataValues }))
    ).run().promise() )
}

const update = tryCatch(pipeP(
    getListing,
    updateListing
  ), log)

module.exports = { create, update }
