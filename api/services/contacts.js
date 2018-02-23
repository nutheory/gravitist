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

const createOrderContact = ({ contactable, contactableId, name, content }) =>
  db.sequelize.transaction(tx =>
    task(resolver => db.Contact.create({ contactable, contactableId, name, content }, { transaction: tx })
    .then(res => resolver.resolve({ contact: res.dataValues }))
    ).run().promise() )

module.exports = { createOrderContact, collection }
