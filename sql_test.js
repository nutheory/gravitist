// var Sequelize = require('sequelize')
// var env       = process.env.NODE_ENV || 'development'
// var config    = require(__dirname + '/config/config.json')[env]
//
// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable]);
// } else {
//   var sequelize = new Sequelize(config.database, config.username, config.password, config);
// }
//
// const pilot = sequelize.define('pilot', {
//   orderId: Sequelize.INTEGER,
//   acceptedAt: Sequelize.DATE,
//   assigned: Sequelize.BOOLEAN
// }, {
//   classMethods: {
//     associate(models) {
//       pilot.belongsToMany(models.Order, {
//         through: 'pilotOrder',
//         foriegnKey: 'pilotId'
//       })
//     }
//   }
// })
//
// sequelize
//   .sync({
//     force: true
//   }).then(() => {
//     pilot.create({
//       orderId: '3',
//       acceptedAt: new Date(),
//       assigned: true
//     })
//   })


import Db from './models'
import Faker from 'faker'
import _ from 'lodash'

console.log(Faker.internet.email())
let list = []
Db.sequelize.models.user.findAll().then(function(userlist){
  _.each(userlist, (user) => {
    list.push(user.name)
  })

  console.log("err", list)
  // console.log("res", res)
})

// console.log("DB", Db.sequelize.models.user.findAll())
