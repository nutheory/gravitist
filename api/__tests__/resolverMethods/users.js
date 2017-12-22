const { gQL, gQLget, gQLpost, generateUserData, generateAddressData, cleanUpTestItem,
  cleanUpTestItemAsAdmin, responseFactory, logInAgent, logInPilot, logInEditor } = require('../utils/helpers')
const { silveradoHighSchool, missionViejoMall, longBeachAirport,
  sanDiegoInternationalAirport } = require('../integration/addresses')
const _ = require('lodash')

const Users = (() => {

  const getProfile = async ( variables ) => {
    const query = `
      query($input: GetProtectedInput){
        getProfile(input: $input){
          user {
            id
            name
            email
            customerId
            type
            address {
              zipCode
            }
          }
        }
      }
    `
    const result = await gQLpost({ query, variables }).catch(err => { return err })
    return result
  }

  const createNewUser = async ( mutationName, attrs = {}, overrides ) => {
    const generalUserData = await generateUserData(overrides)
    let userInfo = _.merge(generalUserData, attrs)
    let data = {}
    const query = `
      mutation($input: ${mutationName}Input){
        create${mutationName}(input: $input){
          user {
            id
            name
            email
            customerId
            type
            address {
              zipCode
            }
          }
          auth {
            token
          }
        }
      }`
    let variables = { input: { user: userInfo } }
    const result = await gQLpost({ query, variables })
    return {
      result,
      async cleanUpUser(){
        const user = result[`create${mutationName}`].user
        gQL.defaults.headers.common.authorization = result[`create${mutationName}`].auth.token
        const wait = await cleanUpTestItem("user", { input: { id: user.id, authorizedId: user.id }}).then(res => {
          gQL.defaults.headers.common.authorization = ''
          return res
        })
      }
    }
  }

  const updateUser = async ( variables ) => {
    const query = `
      mutation($input: UpdateUserInput) {
        updateUser(input: $input){
          user {
            id
            name
            email
            type
            customerId
            address {
              id
              address1
              lat
            }
          }
        }
      }`
    const result = await gQLpost({ query, variables })
    return result
  }

  const destroyUser = async ( variables ) => {
    const query = `
      mutation($input: DestroyUserInput){
        destroyUser(input: $input){
          user {
            name
          }
        }
      }`
    const result = await gQLpost({ query, variables })
    return result
  }

  return {
    getProfile,
    createNewUser,
    updateUser,
    destroyUser
  }

})()

module.exports = Users
