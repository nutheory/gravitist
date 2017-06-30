import _ from 'lodash'
import config from '../config'
import Db from '../models'
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
      zip: address.zip,
      lat: address.lat,
      lng: address.lng
    })

    return newAddress
  }
}

export default Address
// module.exports = Address
