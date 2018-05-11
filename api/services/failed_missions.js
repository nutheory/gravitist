const { task } = require('folktale/concurrency/task')
const db = require('../models')
const chalk = require('chalk')

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const failed = ({ attrs }) =>
  task(resolver => db.FailedMission.findAll({ where: { userId: attrs.pilotId },
    include: [{ model: db.Order, as: 'order', include: [{ model: db.Address, as: 'address'}] },
    { model: db.User, as: 'rejectedByUser' }] })
    .then(res => resolver.resolve({ failedMissions: res })))
  .run().promise()

module.exports = { failed }
