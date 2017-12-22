'use strict'

const avatars = [ '11.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg',
  '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg' ]
const homes = [ '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg',
  '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg',
  '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg',
  '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg',
  '27.jpg', '28.jpg', '29.jpg', '30.jpg' ]
const imagePath = `${__dirname}/../../__tests__/utils/assets`
const _ = require('lodash')
const fs = require('fs')
const uuidv4 = require('uuid/v4')
const Aws = require('aws-sdk')
const config = require('../../config')
const db = require('../../models')
const s3 = new Aws.S3({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: 'us-west-1',
  apiVersion: '2006-03-01'
})
const imageCount = [4, 6, 8]
const chalk = require('chalk')

module.exports = {
  up: async function (queryInterface, Sequelize) {
    const pilots = await db.User.findAll({where: { type: 'pilot'} })
    const orders = await db.Order.findAll({where: { status: 'delivered'} })
    let assetAvatars = []

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/// Clear all S3 TEST assets

    const listParams = {
      Bucket: 'homefilming',
      Prefix: 'test/'
    }
    const listPromise = s3.listObjects(listParams).promise()
    await listPromise.then(res => {
      const keys = []
      res.Contents.map(obj => {
        keys.push({ Key: obj.Key })
      })
      const deleteParams = {
        Bucket: "homefilming",
        Delete: {
          Objects: keys
        }
      }
      console.log(chalk.blue.bold('🔥 RESP1'), res)
      const deletePromise = s3.deleteObjects(deleteParams).promise()
      deletePromise.then(resp => {
        console.log(chalk.blue.bold('🔥 RESP2'), res)
      }).catch(err => {
        console.log(chalk.blue.bold('🔥 ERR2'), err)
      })
    }).catch(err => {
      console.log(chalk.blue.bold('🔥 ERR1'), err)
    })

/// END Clear all S3 TEST assets
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

    await Promise.all(pilots.map(async (p) => {
      let uuid = uuidv4()
      let avatarParams = {
        Key: `test/users/${p.id}/avatar_${uuid}`,
        Body: fs.createReadStream(`${imagePath}/avatars/${_.sample(avatars)}`),
        Bucket: 'homefilming',
        ContentType: 'image/jpeg',
        ACL: 'public-read-write'
      }

      const avatarPromise = s3.upload(avatarParams).promise()
      await avatarPromise.then(async (res) => {
        console.log(chalk.blue.bold('⭐️ REZ'), res)
        await db.Asset.create({
          assetableId: p.id,
          assetable: 'user',
          assetableName: 'avatar',
          awsId: uuid,
          uploaderId: p.id,
          type: "",
          expiresAt: null,
          mime: 'image/jpeg',
          ext: 'jpg',
          url: res.Location,
          active: true,
          meta: {},
          verified: false
        })
      }).catch(err => {
        console.log(chalk.blue.bold('🔥 ERR1'), err)
      })
    }))


    await Promise.all(orders.map( async (o) => {
      let num_of_images = _.sample(imageCount)
      let times = [...Array(num_of_images).keys()]
      await Promise.all(times.map( async (i) => {
        let uuid = uuidv4()
        let orderParams = {
          Key: `test/orders/${o.id}/image-large_${uuid}`,
          Body: fs.createReadStream(`${imagePath}/images/${_.sample(homes)}`),
          Bucket: 'homefilming',
          ContentType: 'image/jpeg',
          ACL: 'public-read-write'
        }

        const orderPromise = s3.upload(orderParams).promise()
        await orderPromise.then( async (res) => {
          console.log(chalk.blue.bold('⭐️ REZ'), res)
          await db.Asset.create({
            assetableId: o.id,
            assetable: 'order',
            assetableName: 'order',
            awsId: uuid,
            uploaderId: o.pilotId,
            type: "",
            expiresAt: null,
            mime: 'image/jpeg',
            ext: 'jpg',
            url: res.Location,
            active: true,
            meta: {},
            verified: false
          })
        }).catch(err => {
          console.log(chalk.blue.bold('🔥 ERR1'), err)
        })
      }))
    }))

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Asset', null, {})
  }
}
