'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addIndex('Users', ['email', 'companyId'])
    queryInterface.addIndex('Orders', ['pilotId', 'receiptId', 'pilotTransferId', 'agentId', 'discountId'])
    queryInterface.addIndex('Addresses', ['addressableId', 'addressable'])
    queryInterface.addIndex('Companies', ['name'])
    queryInterface.addIndex('Contacts', ['contactableId', 'contactable'])
    queryInterface.addIndex('Invitations', ['userId', 'mailId'])
    queryInterface.addIndex('FailedMissions', ['userId', 'orderId'])
    queryInterface.addIndex('Assets', ['assetableId', 'assetable', 'awsId'])
    queryInterface.addIndex('Ratings', ['ratableId', 'ratable'])
    queryInterface.addIndex('ErrorLogs', ['errorableId', 'errorable'])
    queryInterface.addIndex('Notes', ['notableId', 'notable', 'authorId'])
    queryInterface.addIndex('Notifications', ['userId'])
    queryInterface.addIndex('Listings', ['orderId'])
    queryInterface.addIndex('Discounts', ['code'])
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('Users', ['email', 'companyId'])
    queryInterface.removeIndex('Orders', ['pilotId', 'receiptId', 'pilotTransferId', 'agentId', 'discountId'])
    queryInterface.removeIndex('Addresses', ['addressableId', 'addressable'])
    queryInterface.removeIndex('Companies', ['name'])
    queryInterface.removeIndex('Contacts', ['contactableId', 'contactable'])
    queryInterface.removeIndex('Invitations', ['userId', 'mailId'])
    queryInterface.removeIndex('FailedMissions', ['userId', 'orderId'])
    queryInterface.removeIndex('Assets', ['assetableId', 'assetable', 'awsId'])
    queryInterface.removeIndex('Ratings', ['ratableId', 'ratable'])
    queryInterface.removeIndex('ErrorLogs', ['errorableId', 'errorable'])
    queryInterface.removeIndex('Notes', ['notableId', 'notable', 'authorId'])
    queryInterface.removeIndex('Notifications', ['userId'])
    queryInterface.removeIndex('Listings', ['orderId'])
    queryInterface.removeIndex('Discounts', ['code'])
  }
}
