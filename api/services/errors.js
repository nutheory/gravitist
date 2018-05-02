const { task, waitAll } = require('folktale/concurrency/task')
const R = require('ramda')
const db = require('../models')
const { transpilingErrorAlert } = require('../sms/errors')
const chalk = require('chalk')

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const getOrder = ( err ) =>
  db.sequelize.transaction(tx =>
    task(resolver =>
      db.Order.findById(err.fields.orderId, { transaction: tx })
        .then(ordr => resolver.resolve({ ordr, err, tx }))
        .catch(caughtErr => resolver.reject(FailFastError(caughtErr.name, { args: err, loc: 'Service: Error.getUser' }))) )
    .run().promise() )

const flagOrder = ({ ordr, err, tx }) =>
  task(resolver =>
    ordr.update({ needsAttention: true }, { transaction: tx })
    .then(ordr => resolver.resolve({ ordr, err, tx }))
    .catch(caughtErr => resolver.reject(FailFastError(caughtErr.name, { args: err, loc: 'Service: Error.flagOrder' }))) )
  .run().promise()

const saveErrorDetails = ({ ordr, err, tx }) =>
  task(resolver =>
    db.Order.ErrorLog.create({
      errorableId: ordr.id,
      errorable: 'order',
      name: err.error,
      message: err.message,
      reason: err.reason,
      location: err.fields.location,
      jsonResponse: err }, { transaction: tx })
    .then(ordr => resolver.resolve({ ordr, err, tx }))
    .catch(caughtErr => resolver.reject(FailFastError(caughtErr.name, { args: err, loc: 'Service: Error.saveErrorDetails' }))) )
  .run().promise()

const sendSmsAlert = ({ ordr, err, tx }) =>
  transpilingErrorAlert({ ordr, err })

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


const transpilingError = R.pipeP(
  getOrder,
  flagOrder,
  saveErrorDetails,
  sendSmsAlert
)

//  const transpilingError = async (err) =>
//    getOrder =>
//      flagOrder =>
//        saveErrorDetails =>
//          sendSmsAlert =>

//  const transpilingError =
//    (function(err){  --/getOrder/--  })
//    .then(function({ ordr, err, tx }){  --/flagOrder/--  })
//    .then(function({ ordr, err, tx }){  --/saveErrorDetails/--  })
//    .then(function({ ordr, err, tx }){  --/sendSmsAlert/--  })

//  transpilingError(err)({ ordr, err, tx })({ ordr, err, tx })({ ordr, err, tx }) -> ?

//  call
//  transpilingError(err)

module.exports = { transpilingError }
