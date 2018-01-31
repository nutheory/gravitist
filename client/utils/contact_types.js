const { isValidUrl, isValidName, isValidPhone, isValidEmail } = require('./validators')

const ContactTypes = [{
    "type": "cellPhone",
    "humanized": "Cell phone",
    "icon": "mobile",
    "useText": false,
    "ext": "tel",
    "placeholder": "(555) 555-5555",
    "validator": isValidPhone,
    "typename": "phone"
  },
  {
    "type": "officePhone",
    "humanized": "Office phone",
    "icon": "phone",
    "useText": false,
    "ext": "tel",
    "placeholder": "(555) 555-5555",
    "validator": isValidPhone,
    "typename": "phone"
  },
  {
    "type": "homePhone",
    "humanized": "Home phone",
    "icon": "phone",
    "useText": false,
    "ext": "tel",
    "placeholder": "(555) 555-5555",
    "validator": isValidPhone,
    "typename": "phone"
  },
  {
    "type": "email",
    "humanized": "Email",
    "icon": "envelope-o",
    "useText": false,
    "ext": "mailto",
    "placeholder": "name@company.com",
    "validator": isValidEmail,
    "typename": "email"
  },
  {
    "type": "skype",
    "humanized": "Skype",
    "icon": "skype",
    "useText": false,
    "ext": "skype",
    "placeholder": "Skype name",
    "validator": isValidName,
    "typename": "name"
  },
  {
    "type": "slack",
    "humanized": "Slack",
    "icon": "slack",
    "useText": false,
    "placeholder": "Display name",
    "validator": isValidName,
    "typename": "name"
  },
  {
    "type": "msnMessenger",
    "humanized": "MSN Messenger",
    "icon": "windows",
    "useText": false,
    "placeholder": "MSN name",
    "validator": isValidName,
    "typename": "name"
  },
  {
    "type": "website",
    "humanized": "Website",
    "icon": "desktop",
    "useText": false,
    "ext": "http://",
    "placeholder": "eg... yoursite.com",
    "validator": isValidUrl,
    "typename": "url"
  },
  {
    "type": "linkedIn",
    "humanized": "LinkedIn",
    "icon": "linkedin",
    "useText": false,
    "placeholder": "LinkedIn name",
    "validator": isValidName,
    "typename": "name"
  },
  {
    "type": "facebook",
    "humanized": "Facebook",
    "icon": "facebook-official",
    "useText": false,
    "placeholder": "Facebook name",
    "validator": isValidName,
    "typename": "name"
  },
  {
    "type": "twitter",
    "humanized": "Twitter",
    "icon": "twitter",
    "useText": false,
    "placeholder": "@yourname",
    "validator": isValidName,
    "typename": "name"
  },
  {
    "type": "zillow",
    "humanized": "Zillow",
    "icon": "id-badge",
    "useText": true,
    "placeholder": "Zillow name",
    "validator": isValidName,
    "typename": "name"
  },
  {
    "type": "trulia",
    "humanized": "Trulia",
    "icon": "id-badge",
    "useText": true,
    "placeholder": "Trulia name",
    "validator": isValidName,
    "typename": "name"
  },
  {
    "type": "realitor",
    "humanized": "Realitor.com",
    "icon": "id-badge",
    "useText": true,
    "placeholder": "Realitor.com name",
    "validator": isValidName,
    "typename": "name"
  },
  {
    "type": "mlsId",
    "humanized": "MLS ID",
    "icon": "id-badge",
    "useText": true,
    "placeholder": "MLS ID",
    "validator": isValidName,
    "typename": "name"
}]

module.exports = ContactTypes
