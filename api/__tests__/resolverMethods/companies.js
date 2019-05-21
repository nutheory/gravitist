const { gQL, gQLget, gQLpost, generateUserData, generateAddressData, cleanUpTestItem,
  cleanUpTestItemAsAdmin, responseFactory, logInAgent, logInPilot, logInEditor } = require('../utils/helpers')
const chalk = require('chalk')

const Companies = (() => {

  const create = async ( variables ) => {
    const query = `
      mutation($input: CompanyInput) {
        createCompany(input: $input) {
          company {
            id
            name
            ownerId
            key
            styles
            subtitle
            logo {
              asset {
                id
                url
                awsId
                uploaderId
              }
            }
          }
        }
      }
    `
    const result = await gQLpost({ query, variables })
    if(result.data && result.data.errors){console.log("ERR", result.data.errors)}
    return result
  }

  const join = async ( variables ) => {
    const query = `
      mutation($input: JoinCompanyInput) {
        joinCompany(input: $input) {
          company {
            id
            name
          }
        }
      }
    `
    const result = await gQLpost({ query, variables })
    if(result.data && result.data.errors){console.log("ERR", result.data.errors)}
    return result
  }

  const leave = async ( variables ) => {
    const query = `
      mutation($input: LeaveCompanyInput) {
        leaveCompany(input: $input) {
          company {
            id
            name
          }
        }
      }
    `
    const result = await gQLpost({ query, variables })
    if(result.data && result.data.errors){console.log("ERR", result.data.errors)}
    return result
  }

  const destroy = async ( variables ) => {
    const query = `
      mutation($input: DestroyCompanyInput) {
        destroyCompany(input: $input) {
          company {
            name
          }
        }
      }
    `
    const result = await gQLpost({ query, variables })
    if(result.data && result.data.errors){console.log("ERR", result.data.errors)}
    return result
  }

  const update = async ( variables ) => {
    const query = `
      mutation($input: UpdateCompanyInput) {
        updateCompany(input: $input) {
          company {
            id
            name
            ownerId
            styles
            subtitle
            logo {
              asset {
                id
                url
                awsId
                uploaderId
              }
            }
          }
        }
      }
    `
    const result = await gQLpost({ query, variables })
    if(result.data && result.data.errors){console.log("ERR", result.data.errors)}
    return result
  }

  return {
    create,
    join,
    leave,
    update,
    destroy
  }

})()

module.exports = Companies
