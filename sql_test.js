var Sequelize = require('sequelize')
var env       = process.env.NODE_ENV || 'development'
var config    = require(__dirname + '/config/config.json')[env]

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const Aviator = sequelize.define('Aviator', {
  orderId: Sequelize.INTEGER,
  acceptedAt: Sequelize.DATE,
  assigned: Sequelize.BOOLEAN
}, {
  classMethods: {
    associate(models) {
      Aviator.belongsToMany(models.Order, {
        through: 'AviatorOrder',
        foriegnKey: 'aviatorId'
      })
    }
  }
})

sequelize
  .sync({
    force: true
  }).then(() => {
    Aviator.create({
      orderId: '3',
      acceptedAt: new Date(),
      assigned: true
    })
  })
