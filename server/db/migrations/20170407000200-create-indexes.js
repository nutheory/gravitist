'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addIndex('users', ['email'])
    queryInterface.addIndex('orders', ['pilotId', 'receiptId', 'userId'])
    queryInterface.addIndex('addresses', ['userId', 'orderId'])
    queryInterface.addIndex('companies', ['accountId', 'addressId', 'logoId'])
    queryInterface.addIndex('contacts', ['contactableId', 'contactableType'])
    queryInterface.addIndex('pilotOrders', ['orderId', 'pilotId'])
    queryInterface.addIndex('invitations', ['userId', 'mailId'])
    queryInterface.addIndex('assets', ['assetableId', 'assetableType'])
    queryInterface.addIndex('ratings', ['ratableId', 'ratableType'])
    queryInterface.addIndex('notes', ['notableId', 'notableType'])
    queryInterface.addIndex('notifications', ['userId'])
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('users', ['email'])
    queryInterface.removeIndex('orders', ['pilotId', 'receiptId', 'userId'])
    queryInterface.removeIndex('addresses', ['userId', 'orderId'])
    queryInterface.removeIndex('companies', ['accountId', 'addressId', 'logoId'])
    queryInterface.removeIndex('contacts', ['contactableId', 'contactableType'])
    queryInterface.removeIndex('pilotOrders', ['orderId', 'pilotId'])
    queryInterface.removeIndex('invitations', ['userId', 'mailId'])
    queryInterface.removeIndex('assets', ['assetableId', 'assetableType'])
    queryInterface.removeIndex('ratings', ['ratableId', 'ratableType'])
    queryInterface.removeIndex('notes', ['notableId', 'notableType'])
    queryInterface.removeIndex('notifications', ['userId'])
  }
}
