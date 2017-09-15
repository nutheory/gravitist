// const { intStart, gQL } = require('../utils/integration_server')
// const Faker = require('faker')

// let server
//
// beforeAll(async () => {
//   server = await intStart()
// })
//
// afterAll(done => {
//   server.close(done)
// })
//
describe('', () => {

  test('', () => {

  })

})

const silveradoHighScool = {
  address1: '25632 Peter A. Hartman Way',
  city: 'Mission Viejo',
  state: 'ca',
  zipCode: '92691',
  lat: '33.6211337',
  lng: '-117.6828289'
}

//6.1 miles from silvy
const missionViejoMall = {
  address1: '555 The Shops at Mission Viejo',
  city: 'Mission Viejo',
  state: 'ca',
  zipCode: '92691',
  lat: '33.5589135',
  lng: '-117.6681064'
}

//33.4 miles from silvy
const longBeachAirport= {
  address1: '4100 Donald Douglas Dr',
  city: 'Long Beach',
  state: 'ca',
  zipCode: '90808',
  lat: '33.81778',
  lng: '-118.15167'
}

//75.8 miles from silvy
const sanDiegoInternationalAirport= {
  address1: '3225 N Harbor Dr',
  city: 'San Diego',
  state: 'ca',
  zipCode: '92101',
  lat: '32.732346',
  lng: '-117.196053'
}

async function createAddress(){

}

module.exports = { silveradoHighScool, missionViejoMall, longBeachAirport, sanDiegoInternationalAirport }
