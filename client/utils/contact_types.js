import { isValidUrl, isValidName, isValidPhone } from './validators'

const ContactTypes = [{
    "type": "cellPhone",
    "humanized": "Cell phone",
    "icon": "mobile",
    "placeholder": "(555) 555-5555",
    "validator": isValidPhone
  },
  {
    "type": "officePhone",
    "humanized": "Office phone",
    "icon": "phone",
    "placeholder": "(555) 555-5555",
    "validator": isValidPhone
  },
  {
    "type": "homePhone",
    "humanized": "Home phone",
    "icon": "phone",
    "placeholder": "(555) 555-5555",
    "validator": isValidPhone
  },
  {
    "type": "skype",
    "humanized": "Skype",
    "icon": "skype",
    "placeholder": "Skype name",
    "validator": isValidName
  },
  {
    "type": "slack",
    "humanized": "Slack",
    "icon": "slack",
    "placeholder": "Display name",
    "validator": isValidName
  },
  {
    "type": "msnMessenger",
    "humanized": "MSN Messenger",
    "icon": "windows",
    "placeholder": "MSN name",
    "validator": isValidName
  },
  {
    "type": "website",
    "humanized": "Website",
    "icon": "desktop",
    "placeholder": "eg... http://yoursite.com",
    "validator": isValidUrl
  },
  {
    "type": "linkedIn",
    "humanized": "LinkedIn",
    "icon": "linkedin",
    "placeholder": "LinkedIn name",
    "validator": isValidName
  },
  {
    "type": "facebook",
    "humanized": "Facebook",
    "icon": "facebook-official",
    "placeholder": "Facebook name",
    "validator": isValidName
  },
  {
    "type": "twitter",
    "humanized": "Twitter",
    "icon": "twitter",
    "placeholder": "@yourname",
    "validator": isValidName
  },
  {
    "type": "zillow",
    "humanized": "Zillow",
    "icon": "id-badge",
    "placeholder": "Zillow name",
    "validator": isValidName
  },
  {
    "type": "trulia",
    "humanized": "Trulia",
    "icon": "id-badge",
    "placeholder": "Trulia name",
    "validator": isValidName
  },
  {
    "type": "realitor",
    "humanized": "Realitor.com",
    "icon": "id-badge",
    "placeholder": "Realitor.com name",
    "validator": isValidName
  },
  {
    "type": "mlsId",
    "humanized": "MLS ID",
    "icon": "id-badge",
    "placeholder": "MLS ID",
    "validator": isValidName
}]

export default ContactTypes
