const db = require('../../models')
const request = require('supertest')
const fs = require('mz/fs')
const Orders = require('../resolverMethods/orders')
const { gQL, gQLget, gQLpost, generateUserData, generateAddressData, cleanUpTestItem,
  cleanUpTestItemAsAdmin, responseFactory, LogIn } = require('../utils/helpers')
const chalk = require('chalk')

let testFilePath = null
let url = 'http://localhost:9000'

describe('Upload assets for a user', () => {

  let pilot, pilotSnapshot, avatarToDelete
  let avatarImagePath = `${__dirname}/../utils/assets/avatars/1.jpg`
  let updatedAvatarImagePath = `${__dirname}/../utils/assets/avatars/3.jpg`
  let licenseDocPath = `${__dirname}/../utils/assets/docs/resume.pdf`
  let insuranceDocPath = `${__dirname}/../utils/assets/docs/index.html`

  beforeAll( async () => {
    pilot = await LogIn.pilot()
    jasmine.DEFAULT_TIMEOUT_INTERVAL= 12000
    gQL.defaults.headers.common.authorization = pilot.loginUser.auth.token
    pilotSnapshot = pilot.loginUser.user
  })

  afterAll( async () => {
    gQL.defaults.headers.common.authorization = ''
  })

  test(chalk.green.bold('it should upload a users avatar'), () => {
    return request(url)
      .post('/uploads/avatar')
      .set('authorization', pilot.loginUser.auth.token)
      .field('userId', pilotSnapshot.id)
      .field('userType', pilotSnapshot.type)
      .attach('avatar', avatarImagePath)
      .then((res) => {
        const { status } = res.body.upload
        expect(status).toEqual('ASSEMBLY_EXECUTING')
      }).catch(err => console.log(err))
  })

  test(chalk.green.bold('it should delete a file'), () => {

  })

  test(chalk.green.bold('it should upload a pilots insurance'), () => {
    return request(url)
      .post('/uploads/insurance')
      .set('authorization', pilot.loginUser.auth.token)
      .field('userId', pilotSnapshot.id)
      .field('userType', pilotSnapshot.type)
      .attach('insurance', insuranceDocPath)
      .then((res) => {
        const { status } = res.body.upload
        expect(status).toEqual('ASSEMBLY_EXECUTING')
      }).catch(err => console.log(err))
  })

  test(chalk.green.bold('it should upload a pilots license'), () => {
    return request(url)
      .post('/uploads/license')
      .set('authorization', pilot.loginUser.auth.token)
      .field('userId', pilotSnapshot.id)
      .field('userType', pilotSnapshot.type)
      .attach('license', licenseDocPath)
      .then((res) => {
        const { status } = res.body.upload
        expect(status).toEqual('ASSEMBLY_EXECUTING')
      }).catch(err => console.log(err))
  })

})

describe.skip('Bulk upload assets for a mission', () => {

  let pilot, pilotSnapshot, missions, mission
  let canyonImagePath = `${__dirname}/../utils/assets/images/laurel-canyon.jpg`
  let malcolmImagePath = `${__dirname}/../utils/assets/images/malcolm.jpg`
  let videoPath = `${__dirname}/../utils/assets/videos/test_movie.mp4`

  beforeAll( async () => {
    pilot = await LogIn.pilot().catch(err => {console.log(chalk.blue.bold('🚨 '), err)})
    gQL.defaults.headers.common.authorization = pilot.loginUser.auth.token
    jasmine.DEFAULT_TIMEOUT_INTERVAL= 20000
    pilotSnapshot = pilot.loginUser.user
    missions = await Orders.getOrders({
      input: { sortKey: 'pilotAcceptedAt', sortValue: 'DESC', sizeLimit: 5 }
    }).catch(err => {console.log(chalk.blue.bold('🚨 '), err)})
    mission = missions.getOrders[0]
  })

  afterAll( async () => {
    gQL.defaults.headers.common.authorization = ''
  })

  test(chalk.green.bold('it should send the files to transloadit for a pilots mission'), () => {

    return request(url)
      .post('/pilot-order-uploader')
      .set('authorization', pilot.loginUser.auth.token)
      .field('orderId', mission.id)
      .attach('assets', canyonImagePath)
      .attach('assets', malcolmImagePath)
      .then(res => {
        const { status, uploadCount } = res.body.uploads
        expect(status).toEqual('ASSEMBLY_EXECUTING')
        expect(uploadCount).toEqual(2)
      })
  })

})


// async function uploadPilotAssets( file = "", params = {} ) {
//   let data = new FormData()
//   console.log(chalk.blue.bold("DATA"), data)
//   data.append('image', truckImg, 'truckImg.jpg')
//   const config = { headers: { 'content-type': 'multipart/form-data' }}
//   return axios.post('/uploads', data, config)
// }
//
// module.exports = { uploadPilotAssets }
