var Sequelize = require('sequelize')
var env       = process.env.NODE_ENV || 'development'
var config    = require(__dirname + '/server/db/config/config.json')[env]

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

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

// models.sequelize.sync().then(function() {
//
//     console.log('Nice! Database looks fine')
//
// }).catch(function(err) {
//
//     console.log(err, "Something went wrong with the Database Update!")
//
// })
// const Db = require('./models')
// const Faker = require('faker')
// const _ = require('lodash')
//
// console.log(Faker.internet.email())
// let list = []
// Db.sequelize.models.user.findAll().then(function(userlist){
//   _.each(userlist, (user) => {
//     list.push(user.name)
//   })
//
//   console.log("err", list)
//   // console.log("res", res)
// })

// console.log("DB", Db.sequelize.models.user.findAll())

const Db = require('./server/models')
const Order = Db.sequelize.models.order
const Address = Db.sequelize.models.address
const User = Db.sequelize.models.user
// const OrderDb = Db.sequelize.models.order

let order = {}

Order.find({
  where: { id: 1, userId: 1 },
  include: [ Address, User ]
}).then((res) => {
  console.log('ORDER2', res.dataValues.user.dataValues)
  console.log('ORDER3', res.dataValues.address.dataValues)

  console.log('ORDER1', res.get({plain: true}))
  return res.dataValues
})

console.log('ORDER', order)
