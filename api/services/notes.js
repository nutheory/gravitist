const { task } = require('folktale/concurrency/task')
const { clone } = require('ramda')
const db = require('../models')
const chalk = require('chalk')

const collection = ({ input }) =>
  task(resolver => db.Note.findAll({
    where: { notable: input.model, notableId: input.modelId },
    include: [{ model: db.User, as: 'author',
      include: [{ model: db.Asset, as: 'avatar' }] }],
    order: [['createdAt', 'ASC']] })
      .then(res => resolver.resolve({ notes: res }))
  ).run().promise()

const create = ({ input, usr }) =>
  db.sequelize.transaction(tx =>
    task(resolver => db.Note.create({ notable: input.model, notableId: input.modelId, body: input.note.body,
      authorId: usr.id }, { transaction: tx }).then(res => resolver.resolve({ note: res.dataValues }))
    ).run().promise() )

const destroy = (noteId, userId) =>
  task(async (resolver) => {
    const note = await db.Note.find({ where: { id: noteId, authorId: userId } })
    const cl = note ? note.dataValues : null
    note.destroy().then(res => resolver.resolve({ note: cl }))
  }).run().promise()


module.exports = { create, destroy, collection }
