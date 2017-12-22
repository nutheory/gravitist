const _ = require('lodash')
const db = require('../models')
const { FailFastError } = require('../utils/errors')
const chalk = require('chalk')

async function create(company){
  const newCompany = await db.sequelize.transaction(t => {
    return db.Company.create(company, { transaction: t }).then( async (comp) => {
      const user = await db.User.find({ where: { id: company.ownerId }}, { transaction: t })
      const logoPromise = db.Asset.create(_.merge(company.logo,
        { assetableId: comp.id, assetable: 'logo', verified: true, active: true }), { transaction: t })
      const userPromise = user.update({ companyId: comp.id, companyOwner: true }, { transaction: t })
      const [ logo, usr ] = await Promise.all([ logoPromise, userPromise ])
      const result = _.merge(comp.dataValues, { logo: logo.dataValues })
      return { company: result }
    }).catch(err => { throw err })
  }).catch(err => { throw err })
  return newCompany
}

async function join({ key, companyId, userId }){
  const companyPromise = db.Company.findById(companyId)
  const userPromise = db.User.findById(userId)
  const [ company, user ] = await Promise.all([ companyPromise, userPromise ])
  if(company.key !== key) { throw FailFastError("CompanyAccessError", { email: user.email, name: user.name }) }
  const result = await user.update({ companyId: company.id })
  return { company }
}

async function leave({ companyName, userId }){
  const user = await db.User.findById(userId)
  const result = await user.update({ companyId: null })
  return { company: { name: companyName } }
}

async function update({ companyId, details }){
  if(details.name === undefined){ delete details.name }
  const company = await db.Company.find({ where: { id: companyId },
    include: [ { model: db.Asset, as: 'logo', fields: db.Asset.updateFields } ] })
  const companyUpdate = await company.update(details).catch(err => { throw err })
  return { company: _.merge( companyUpdate.dataValues, { logo: companyUpdate.logo.dataValues }) }
}

async function destroy(companyId, userId){
  const companyPromise = db.Company.find({ where: { id: companyId},
    include: [ { model: db.Asset, as: 'logo' } ] })
  const userPromise = db.User.find({ where: { id: userId} })
  const [ company, user ] = await Promise.all([ companyPromise, userPromise ])
  const destroyed = await user.update({ companyId: null, companyOwner: false }).then(res => {
    company.destroy()
    return { company: { name: company.name } }
  })
  return destroyed
}

module.exports = { create, destroy, join, leave, update }
