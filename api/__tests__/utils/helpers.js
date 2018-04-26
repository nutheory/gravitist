const AppError = require('../../utils/appErrors').createAppError
const _ = require('lodash')
const chalk = require('chalk')
const faker = require('faker')
const axios = require('axios')
const Addresses = require('../../db/utils/Addresses.json')
const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1)
const randSix = () => Math.floor(100000 + Math.random() * 900000)
const gQL = axios.create({ baseURL: `http://localhost:${process.env.PORT}/` })
const DistAddresses = {
  silveradoHighSchool: {
    address1: '25632 Peter A. Hartman Way',
    city: 'Mission Viejo',
    state: 'CA',
    zipCode: '92691',
    lat: 33.6211337,
    lng: -117.6828289
  },
  //6.1 miles from silvy
  missionViejoMall: {
    address1: '555 The Shops at Mission Viejo',
    city: 'Mission Viejo',
    state: 'CA',
    zipCode: '92691',
    lat: 33.5589135,
    lng: -117.6681064
  },
  //33.4 miles from silvy
  longBeachAirport: {
    address1: '4100 Donald Douglas Dr',
    city: 'Long Beach',
    state: 'CA',
    zipCode: '90808',
    lat: 33.81778,
    lng: -118.15167
  },
  //75.8 miles from silvy
  sanDiegoInternationalAirport: {
    address1: '3225 N Harbor Dr',
    city: 'San Diego',
    state: 'CA',
    zipCode: '92101',
    lat: 32.732346,
    lng: -117.196053
  }
}

const LogIn = ({
  query: () => `
    mutation($input: LoginInput!) {
      loginUser(input: $input){
        user {
          id
          name
          email
          companyId
          companyOwner
          customerId
          type
          address {
            address1
            address2
            type
            city
            state
            zipCode
            lat
            lng
          }
        }
        auth {
          token
        }
      }
    }
  `,
  user: async ({ email, password }) => await gQLpost({ query: LogIn.query(),
    variables: { input: { email, password } }}).catch(err => { throw err }),
  agent: () => LogIn.user({ email: "drush81+agent@gmail.com", password: "Letmein@1" }),
  pilot: () => LogIn.user({ email: "drush81+pilot@gmail.com", password: "Letmein@1" }),
  editor: () => LogIn.user({ email: "drush81+editor@gmail.com", password: "Letmein@1" }),
  admin: () => LogIn.user({ email: "drush81+admin@gmail.com", password: "Letmein@1" }),
  super: () => LogIn.user({ email: "drush81+super@gmail.com", password: "Letmein@1" })
})

const gQLpost = async ({ query, variables }) => {
  const result = await gQL.post( '/graphql', { query, variables })
    .then(res => {
      return responseFactory(res)})
    .catch((e) => {
      // if(e.data && e.data.errors){ console.log("EEEEEEEEEEEEEE", e.data.errors) }
      // else { console.log("EEEEEEEEEEEEEE - NO ERR", e) }
      return e
    })
  return result
}

const generateUserData = (overrides = {}) => {
  const password = "Letmein@1"
  const name = `${faker.name.firstName()} ${faker.name.lastName()}`
  const email = overrides.email || faker.internet.email()
  return { name, email, password }
}

const generateAddressData = (overrides = {}) => {
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

const responseFactory = (res) => {
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
      // console.log("RF",res.data)
      throw res
    }
    response[key] = res.data.data[key]
  })
  return response
}

const cleanUpTestItem = async (mutationName, variables) => {
  const query = `
    mutation($input: Destroy${capitalizeFirstLetter(mutationName)}Input){
      destroy${capitalizeFirstLetter(mutationName)}(input: $input){
        ${mutationName} {
          id
        }
      }
    }
  `
  const result = await gQLpost({ query, variables })
    .catch(e => {
      throw `${chalk.red.bold(e)}`
    })
  return result
}


const cleanUpTestItemAsAdmin = async (mutationName, variables) => {
  const query = `
    mutation($input: Destroy${capitalizeFirstLetter(mutationName)}Input){
      destroy${capitalizeFirstLetter(mutationName)}(input: $input){
        ${mutationName} {
          id
        }
      }
    }
  `
  const admin = await LogIn.admin
  gQL.defaults.headers.common.authorization = admin.loginUser.auth.token
  const result = await gQLpost({query, variables})
    .catch(e => {
      console.log(chalk.yellow.bold(e))
      throw `${chalk.red.bold(e)}`
    })
  gQL.defaults.headers.common.authorization = ''
  return result
}

module.exports = { randSix, gQL, gQLpost, generateUserData, generateAddressData,
  cleanUpTestItem, cleanUpTestItemAsAdmin, responseFactory, LogIn }
