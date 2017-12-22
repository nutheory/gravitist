const { gQL, gQLget, gQLpost, responseFactory, logInAgent } = require('../utils/helpers')
const _ = require('lodash')
const Faker = require('faker')
const chalk = require('chalk')


const Payments = (() => {

  const getCustomer = async ( variables ) => {
    const query = `
      query($input: GetCustomerInput){
        getCustomer(input: $input){
          customer {
            id
            object
            default_source
            created
            description
            discount
            metadata
            email
            sources {
              id
              object
              total_count
              has_more
              url
              data {
                id
                object
                brand
                country
                dynamic_last4
                cvc_check
                customer
                exp_month
                exp_year
                fingerprint
                funding
                last4
                metadata
              }
            }
          }
        }
      }
    `
    const result = await gQLpost({ query, variables }).catch(err => { return err })
    return result
  }

  const createSource = async ( variables ) => {
    const query = `
      mutation($input: CreateSourceInput){
        createSource(input: $input){
          customer {
            id
            default_source
            email
            sources {
              id
              object
              total_count
              has_more
              url
              data {
                id
                brand
                customer
                exp_month
                exp_year
                last4
              }
            }
          }
        }
      }
    `
    const result = await gQLpost({ query, variables }).catch(err => { return err })
    return result
  }

  const destroySource = async ( variables ) => {
    const query = `
      mutation($input: DestroySourceInput){
        destroySource(input: $input){
          id
        }
      }
    `
    const result = await gQLpost({ query, variables }).catch(err => { return err })
    return result
  }

  const setDefaultSource = async ( variables ) => {
    const query = `
      mutation($input: SetDefaultSourceInput){
        setDefaultSource(input: $input){
          customer {
            id
            default_source
            email
            sources {
              id
              object
              total_count
              has_more
              url
              data {
                id
                brand
                customer
                exp_month
                exp_year
                last4
              }
            }
          }
        }
      }
    `
    const result = await gQLpost({ query, variables }).catch(err => { return err })
    return result
  }

  return {
    getCustomer,
    setDefaultSource,
    createSource,
    destroySource
  }

})()

module.exports = Payments
