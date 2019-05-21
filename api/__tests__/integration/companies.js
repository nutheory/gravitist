const db = require('../../models')
const Op = db.Sequelize.Op
const Companies = require('../resolverMethods/companies')
const Users = require('../resolverMethods/users')
const { gQL, gQLget, gQLpost, generateUserData, generateAddressData, cleanUpTestItem,
  cleanUpTestItemAsAdmin, responseFactory, LogIn } = require('../utils/helpers')
const chalk = require('chalk')
const _ = require('lodash')

describe('company mutations', async () => {

  let agent, agentSnapshot

  beforeAll( async () => {
    agent = await LogIn.agent()
    gQL.defaults.headers.common.authorization = agent.loginUser.auth.token
    agentSnapshot = agent.loginUser.user
  })

  afterAll( async () => {
    gQL.defaults.headers.common.authorization = ''
  })

  test(chalk.green.bold('it should create a new company'), async () => {
    const styleObj = { color: "#000", fontFamily: "times new roman", background: "blue" }
    const styles = JSON.stringify(styleObj)
    const newCompany = await Companies.create({ input: { name: 'REmax', visible: "true",
      styles, logo: { asset: { url: "test.com", awsId: "this-is-a-id", name: "create" } } } })
    const company = newCompany['createCompany'].company
    expect(newCompany.status).toEqual(200)
    expect(company.name).toEqual('REmax')
    expect(company.logo.asset.url).toEqual('test.com')
    // clean up
    await Companies.destroy({ input: { id: company.id, authorizedId: company.ownerId }})
  })

  test(chalk.green.bold('it should update a company'), async () => {
    const company = await createCompany("update")
    const updateCompany = await Companies.update({ input: { id: company.id, authorizedId: company.ownerId,
      subtitle: 'this is a subtitle', name: "update" } })
    const updated = updateCompany['updateCompany'].company
    expect(updated.name).toEqual('update')
    expect(updated.subtitle).toEqual('this is a subtitle')
    // clean up
    await Companies.destroy({ input: { id: updated.id, authorizedId: updated.ownerId }})
  })

  test(chalk.green.bold('it should destroy a company'), async () => {
    const company = await createCompany("destroy")
    const destroyCompany = await Companies.destroy({ input: { id: company.id, authorizedId: company.ownerId }})
    const result = destroyCompany['destroyCompany'].company
    expect(destroyCompany.status).toEqual(200)
    expect(result.name).toEqual('destroy')
  })

})

describe('join and leave a company mutations', async () => {

  let agent, agentSnapshot, company

  beforeAll( async () => {
    const agent = await LogIn.agent()
    gQL.defaults.headers.common.authorization = agent.loginUser.auth.token
    agentSnapshot = agent.loginUser.user
    company = await createCompany("join")
  })

  afterAll( async () => {
    await Companies.destroy({ input: { id: company.id, authorizedId: company.ownerId }})
    gQL.defaults.headers.common.authorization = ''
  })

  test(chalk.green.bold('it should join a company'), async () => {
    const joiningAgent = await secondAgent()
    expect(joiningAgent.companyId).toEqual(null)
    const joinCompany = await Companies.join({ input: { id: company.id, key: company.key } })
    const joinedCompany = joinCompany['joinCompany'].company
    const joinedAgent = await db.User.findOne({ where: { type: "agent", id: joiningAgent.id } })
    expect(joinedAgent.dataValues.companyId).toEqual(parseInt(joinedCompany.id))
    expect(joinedCompany.name).toEqual("join")
    const leaveCompany = await Companies.leave({ input: { name: company.name } })
    const leftCompany = leaveCompany['leaveCompany'].company
    expect(leftCompany.name).toEqual("join")
  })

  test(chalk.green.bold('it should not join a company with a bad key'), async () => {
    const joiningAgent = await secondAgent()
    expect(joiningAgent.companyId).toEqual(null)
    const joinCompany = await Companies.join({ input: { id: company.id, key: `${company.key}89` } })
    expect(joinCompany.data.errors[0]).toHaveProperty("name", "CompanyAccess")
  })

})

async function secondAgent(){
  gQL.defaults.headers.common.authorization = ''
  const getAgent = await db.User.findOne({ 
    where: { 
      type: "agent", email: { [Op.ne]: "drush81+agent@gmail.com" } } 
  }).then(res => res.dataValues.email)
  const newAgent = await LogIn.user({ email: getAgent, password: "Letmein@1" })
  gQL.defaults.headers.common.authorization = newAgent.loginUser.auth.token
  return newAgent.loginUser.user
}

async function createCompany(name){
  const newCompany = await Companies.create({ input: { name, visible: "true",
    logo: { asset: { url: "test.com", awsId: "this-is-a-id", name: "func" } } } })
  return newCompany['createCompany'].company
}

// console.log(chalk.blue.bold('company.key'), company.key)
// console.log(chalk.blue.bold('joiningAgent'), joiningAgent)


// async function cleanupCompany({ id, userId }){
//   const destroyCompany = await db.Company.findById(id)
//   const destroyedCompany = await destroyCompany.destroy()
//   const restoreUser = await db.User.findById(userId)
//   const updated = await restoreUser.update({ companyId: null, companyOwner: false })
// }
