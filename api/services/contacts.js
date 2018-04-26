const { task } = require('folktale/concurrency/task')
const { clone } = require('ramda')
const db = require('../models')
const chalk = require('chalk')

const collection = ({ input }) =>
  task(resolver =>
    db.Contact.findAll({ where: { contactable: input.model, contactableId: input.modelId },
    include: [ { model: db.User, as: 'author', include: [ { model: db.Asset, as: 'avatar' } ] } ],
    order: [['createdAt', 'ASC']] }).then(res => { resolver.resolve({ notes: res }) } ) )
  .run().promise()

const createOrderContact = ({ attrs: { contactable, contactableId, name, type, content } }) =>
  db.sequelize.transaction(tx =>
    task(resolver => db.Contact.create({ contactable, contactableId, name, type, content }, { transaction: tx })
      .then(res => resolver.resolve({ lead: res.dataValues }))
    ).run().promise() )

module.exports = { createOrderContact, collection }
