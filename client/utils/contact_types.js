const { isValidUrl, isValidName, isValidPhone, isValidEmail } = require('./validators')
const { formatPhone } = require('./helpers')


const ContactTypes = [{
    "type": "phone",
    "humanized": "Phone",
    "icon": "fa fa-phone",
    "useText": false,
    "ext": "tel",
    "placeholder": "(555) 555-5555",
    "validator": isValidPhone,
    "typename": "phone",
    "formatter": formatPhone,
    "mask": '1 \\(999\\) 999-9999 \\ext. 9999'
  }, {
    "type": "email",
    "humanized": "Email",
    "icon": "fa fa-envelope",
    "useText": false,
    "ext": "mailto",
    "placeholder": "name@company.com",
    "validator": isValidEmail,
    "typename": "email"
  }, {
    "type": "skype",
    "humanized": "Skype",
    "icon": "fab fa-skype",
    "useText": false,
    "ext": "skype",
    "placeholder": "Skype name",
    "validator": isValidName,
    "typename": "name"
  },
  {
    "type": "slack",
    "humanized": "Slack",
    "icon": "fab fa-slack",
    "useText": false,
    "placeholder": "Display name",
    "validator": isValidName,
    "typename": "name"
  },
  {
    "type": "msnMessenger",
    "humanized": "MSN Messenger",
    "icon": "fab fa-windows",
    "useText": false,
    "placeholder": "MSN name",
    "validator": isValidName,
    "typename": "name"
  },
  {
    "type": "website",
    "humanized": "Website",
    "icon": "fa fa-desktop",
    "useText": false,
    "ext": "http://",
    "placeholder": "eg... yoursite.com",
    "validator": isValidUrl,
    "typename": "url"
  },
  {
    "type": "linkedIn",
    "humanized": "LinkedIn",
    "icon": "fab fa-linkedin",
    "useText": false,
    "placeholder": "LinkedIn name",
    "validator": isValidName,
    "typename": "name"
  },
  {
    "type": "facebook",
    "humanized": "Facebook",
    "icon": "fab fa-facebook",
    "useText": false,
    "placeholder": "Facebook name",
    "validator": isValidName,
    "typename": "name"
  },
  {
    "type": "twitter",
    "humanized": "Twitter",
    "icon": "fab fa-twitter",
    "useText": false,
    "placeholder": "@yourname",
    "validator": isValidName,
    "typename": "name"
  },
  {
    "type": "zillow",
    "humanized": "Zillow",
    "icon": "fa fa-id-badge",
    "useText": true,
    "placeholder": "Zillow name",
    "validator": isValidName,
    "typename": "name"
  },
  {
    "type": "trulia",
    "humanized": "Trulia",
    "icon": "fa fa-id-badge",
    "useText": true,
    "placeholder": "Trulia name",
    "validator": isValidName,
    "typename": "name"
  },
  {
    "type": "realitor",
    "humanized": "Realitor.com",
    "icon": "fa fa-id-badge",
    "useText": true,
    "placeholder": "Realitor.com name",
    "validator": isValidName,
    "typename": "name"
  },
  {
    "type": "mlsId",
    "humanized": "MLS ID",
    "icon": "fa fa-id-badge",
    "useText": true,
    "placeholder": "MLS ID",
    "validator": isValidName,
    "typename": "name"
}]

module.exports = ContactTypes
