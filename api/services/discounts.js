const { task, waitAll } = require('folktale/concurrency/task')
const R = require('ramda')
const db = require('../models')

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const log = data =>
  R.tap(console.log(chalk.blue.bold('DATA'), data))

const getDiscounts = () =>
  task(resolver => db.Discount.findAll().then(res =>
    resolver.resolve({ discounts: res })) ).run().promise()

const createDiscount = ({ attrs, usr }) =>
  db.sequelize.transaction(tx =>
    task(resolver => db.Discount.create(R.merge(attrs, { createdBy: usr.id }), { transaction: tx })
      .then(res => resolver.resolve({ discount: res.dataValues }))
    ).run().promise() )

const destroyDiscount = ({ id }) => {

}

const applyDiscount = ({ code }) =>
  task(resolver => db.Discount.find({ where: { code } }).then(res =>
    resolver.resolve({ discount: res ? res.dataValues : null })) ).run().promise()

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const discounts = R.tryCatch(R.pipeP(getDiscounts),log)
const create = R.tryCatch(R.pipeP(createDiscount),log)
const destroy = R.tryCatch(R.pipeP(destroyDiscount),log)
const apply = R.tryCatch(R.pipeP(applyDiscount),log)

module.exports = { create, destroy, discounts, apply }
