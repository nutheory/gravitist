'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addIndex('users', ['email'])
    queryInterface.addIndex('orders', ['pilotId', 'receiptId', 'agentId'])
    queryInterface.addIndex('addresses', ['userId', 'orderId'])
    queryInterface.addIndex('companies', ['accountId', 'addressId', 'logoId'])
    queryInterface.addIndex('contacts', ['contactableId', 'contactableType'])
    queryInterface.addIndex('invitations', ['userId', 'mailId'])
    queryInterface.addIndex('assets', ['assetableId', 'assetableType'])
    queryInterface.addIndex('ratings', ['ratableId', 'ratableType'])
    queryInterface.addIndex('notes', ['notableId', 'authorId'])
    queryInterface.addIndex('notifications', ['userId'])
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('users', ['email'])
    queryInterface.removeIndex('orders', ['pilotId', 'receiptId', 'agentId'])
    queryInterface.removeIndex('addresses', ['userId', 'orderId'])
    queryInterface.removeIndex('companies', ['accountId', 'addressId', 'logoId'])
    queryInterface.removeIndex('contacts', ['contactableId', 'contactableType'])
    queryInterface.removeIndex('invitations', ['userId', 'mailId'])
    queryInterface.removeIndex('assets', ['assetableId', 'assetableType'])
    queryInterface.removeIndex('ratings', ['ratableId', 'ratableType'])
    queryInterface.removeIndex('notes', ['notableId', 'authorId'])
    queryInterface.removeIndex('notifications', ['userId'])
  }
}
