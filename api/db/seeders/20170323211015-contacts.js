'use strict'
const Faker = require('faker')
const _ = require('lodash')
const db = require('../../models')
const nums = [ 1, 2, 3 ]
const cTypes =  require('../../../client/utils/contact_types.js')

module.exports = {
  up: async function (queryInterface, Sequelize) {
    const users = await db.User.findAll()

    const fakeContentGen = (typename) => {
      if(typename === "name"){
        return Faker.internet.userName()
      } else if(typename === "url"){
        return Faker.internet.url()
      } else if(typename === "phone"){
        return Faker.phone.phoneNumber()
      } else if(typename === "email"){
        return Faker.internet.email()
      }
    }

    const contacts = []

    await users.map( async (u) => {
      let num_of_contacts = _.sample(nums)
      let times = [...Array(num_of_contacts).keys()]
      await times.map( async (c, i) => {
        let cType = _.sample(cTypes)
        let type = cType.type
        let content = fakeContentGen(cType.typename)
        let contact = {
          contactableId: u.id,
          contactable: 'user',
          default: i === 0 ? true : false,
          type,
          content
        }
        contacts.push(contact)
      })
    })

    await db.Contact.bulkCreate(contacts)
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
}
