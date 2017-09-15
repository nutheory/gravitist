const addressInput = require('./addresses-us-all.json')
const _ = require('lodash')
const fs = require('fs')

const addresses = addressInput.addresses

const filteredAddresses = _.filter( addresses, ['state', 'CA'])

const formattedAddresses = []

_.each(filteredAddresses, (address) => {

  let newAddress = {}

  _.each(address, ( val, key ) => {

    if ( key == 'postalCode' ){
      newAddress.zipCode = val
    } else if ( key == 'coordinates' ){
      _.each(val, ( value, coordKey ) => {
        newAddress[coordKey] = `${value}`
      })
    } else {
      newAddress[key] = val
    }

  })

  formattedAddresses.push(newAddress)

})

console.log(formattedAddresses)

let newAddressList = JSON.stringify(formattedAddresses, null, 2)

fs.writeFile('addresses.json', newAddressList, (err) => {
    if (err) throw err
    console.log('Data written to file')
})
