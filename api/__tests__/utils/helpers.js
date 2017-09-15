const AppError = require('../../utils/appErrors').createAppError
const _ = require('lodash')
const chalk = require('chalk')
const faker = require('faker')
const axios = require('axios')
const Addresses = require('../../db/utils/Addresses.json')

const randSix = () => {
  return Math.floor(100000 + Math.random() * 900000)
}

const gQL = axios.create({
  baseURL: 'http://localhost:9000/'
})

async function gQLget({ query, variables }){
  const result = await gQL.get( '/graphql', { query, variables })
    .then(res => {
      return responseFactory(res)})
    .catch((e) => {
      throw `gQLget - ${chalk.red.bold(e)}`
    })
  return result
}

async function gQLpost({ query, variables }){
  const result = await gQL.post( '/graphql', { query, variables })
    .then(res => {
      return responseFactory(res)})
    .catch((e) => {
      throw `gQLpost - ${chalk.red.bold(e)}`
    })
  return result
}

async function generateUserData(overrides = {}){
  const password = faker.internet.password()
  const name = `${faker.name.firstName()} ${faker.name.lastName()}`
  const email = overrides.email || faker.internet.email()
  return { name, email, password }
}

async function generateAddressData(overrides = {}){
  const address = _.sample(Addresses)
  return {
    address1: overrides.address1 || address.address1,
    address2: overrides.address2 || address.address2,
    city: overrides.city || address.city,
    state: overrides.state || address.state,
    zipCode: overrides.zipCode || address.zipCode,
    lat: overrides.lat || address.lat,
    lng: overrides.lng || address.lng
  }
}

function logInAgent(){
  const user = logInUser({ email: "drush81+agent@gmail.com", password: "Letmein@1" })
  return user
}

async function logInPilot(){
  const user = await logInUser({ email: "drush81+pilot@gmail.com", password: "Letmein@1" })
  return user
}

async function logInEditor(){
  const user = await logInUser({ email: "drush81+editor@gmail.com", password: "Letmein@1" })
  return user
}

async function logInAdmin(){
  const user = await logInUser({ email: "drush81+admin@gmail.com", password: "Letmein@1" })
  return user
}

async function logInSuper(){
  const user = await logInUser({ email: "drush81+super@gmail.com", password: "Letmein@1" })
  return user
}

async function logInUser({ email, password }){
  const variables = { input: { email, password } }
  const query = `
    mutation($input: LoginInput!) {
      login(input: $input){
        user {
          id
          name
          email
        }
        auth {
          token
        }
      }
    }
  `
  const result = await gQLpost({query, variables})
  return result
}


async function responseFactory(res){
  if( res == undefined ){
    throw( AppError( {
      type: `Testing.responseFactory`,
      message: `No response`
    } ) )
  }

  if(res.config == undefined){
    console.log("FIXXXXXXXXXXX", res.config)
  }

  const response = {}
  response.status = res.status
  response.headers = res.headers
  response.method = res.config.method || ""
  response.url = res.config.url
  response.rawQuery = res.config.data
  _.each(res.data.data, (val, key) => {
    if( res && res.data.errors ){
      throw( AppError( {
        type: `Testing.${key}.responseFactory (${res.data.errors.length})`,
        message: res.data.errors[0].message
      } ) )
    }
    response[key] = res.data.data[key]
  })
  return response
}

async function cleanUpTestItem(mutationName, variables){
  const query = `
    mutation($input: ${capitalizeFirstLetter(mutationName)}Input){
      ${mutationName}(input: $input){
        id
      }
    }
  `
  const result = await gQLpost({ query, variables })
    .catch(e => {
      throw `${chalk.red.bold(e)}`
    })
  return result
}


async function cleanUpTestItemAsAdmin(mutationName, variables){
  const query = `
    mutation($input: ${capitalizeFirstLetter(mutationName)}Input){
      ${mutationName}(input: $input){
        id
      }
    }
  `
  const admin = await logInAdmin()
  gQL.defaults.headers.common.authorization = admin.login.auth.token
  const result = await gQLpost({query, variables})
    .catch(e => {
      console.log(chalk.yellow.bold(e))
      throw `${chalk.red.bold(e)}`
    })
  gQL.defaults.headers.common.authorization = ''
  return result
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = { randSix, gQL, gQLpost, gQLget, generateUserData, generateAddressData,
  cleanUpTestItem, cleanUpTestItemAsAdmin, responseFactory, logInAgent, logInPilot,
  logInEditor, logInAdmin, logInUser }
