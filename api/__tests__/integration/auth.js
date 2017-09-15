const { gQL, gQLpost, generateUserData, generateAddressData, cleanUpTestItem, responseFactory, logInAgent } = require('../utils/helpers')

describe('existing user can perform authentication actions', () => {

  // test('user can login and receive valid token from external sources', async () => {
  //   gQL.defaults.headers.common.authorization = ''
  //   const agent = await logInAgent()
  //   expect(agent.status).toEqual(200)
  //   expect(agent.login.user).toHaveProperty('name', 'Derek Rush')
  //   expect(agent.login.auth).toHaveProperty('token', expect.any(String))
  // })

  test('user can login and receive valid token from internal methods', async () => {
    gQL.defaults.headers.common.authorization = ''
    const agent = await logInAgent()
    expect(agent.status).toEqual(200)
    expect(agent.login.user).toHaveProperty('name', 'Derek Rush')
    expect(agent.login.auth).toHaveProperty('token', expect.any(String))
  })

})
