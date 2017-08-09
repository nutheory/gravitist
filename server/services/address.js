const _ = require('lodash')
const config = require('../config')
const Db = require('../models')
const AddressDb = Db.sequelize.models.address

class Address {
  constructor(address){
    // this.Address = address
  }
  static async createAddress(address){
    const newAddress = AddressDb.create({
      address1: address.address1,
      address2: address.address2,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      lat: address.lat,
      lng: address.lng
    })

    return newAddress
  }
}

module.exports = Address
