const { gQL, gQLpost, generateUserData, generateAddressData, cleanUpTestItem, responseFactory, LogIn } = require('../utils/helpers')
const chalk = require('chalk')

describe('existing user can perform authentication actions', () => {

  // test('user can login and receive valid token from external sources', async () => {
  //   gQL.defaults.headers.common.authorization = ''
  //   const agent = await logInAgent()
  //   expect(agent.status).toEqual(200)
  //   expect(agent.login.user).toHaveProperty('name', 'Derek Rush')
  //   expect(agent.login.auth).toHaveProperty('token', expect.any(String))
  // })

  test(chalk.green.bold('user can login and receive valid token from internal methods'), async () => {
    gQL.defaults.headers.common.authorization = ''
    const agent = await LogIn.agent()
    expect(agent.status).toEqual(200)
    expect(agent.loginUser.user).toHaveProperty('name', 'Derek Rush')
    expect(agent.loginUser.auth).toHaveProperty('token', expect.any(String))
  })

  test(chalk.green.bold('user will fail login with bad cred'), async () => {
    gQL.defaults.headers.common.authorization = ''
    const agent = await LogIn.user({email: "yyyyyyyyy@yyy.com", password: "badpass"})
    expect(agent.status).toEqual(200)
    expect(agent.data.errors[0]).toHaveProperty('message', expect.stringContaining('NotFound'))
  })

})
