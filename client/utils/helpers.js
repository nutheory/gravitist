const Moment = require('moment')

const humanize = (str) => str
  .replace(/^[\s_]+|[\s_]+$/g, '')
  .replace(/[_\s]+/g, ' ')
  .replace(/^[a-z]/, (m) => m.toUpperCase())

const dateTimeShort = (date) => Moment(Date.parse(date)).format('MMM Do YYYY, h:mma')
const dateShort = (date) => Moment(Date.parse(date)).format('MMMM Do YYYY')
const formatPhone = (phone) => {
  const newStr = phone.replace(/[ _]/g, '').replace(/\sext\.$/, '').trim()
  const phoneTest = new RegExp(/^((\+1)|1)? ?\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})( ?(ext\.? ?|x)(\d*))?$/)
  const results = phoneTest.exec(newStr)
  if (results !== null && results.length > 8) {
    return "(" + results[3] + ") " + results[4] + "-" + results[5] + (typeof results[8] !== "undefined" && results[8].length > 0 ? " x" + results[8] : "")
  } else {
    return newStr
  }
}

const cleansePrice = (price) => price.replace(/[ ,$]/g, '')

const calcPercentageDiscount = ({ base, percent }) => {
  const baseAmount = base.includes('.') ? parseInt(base.replace(/\./g,'')) : parseInt(base)
  const percentAmount = percent.includes('%') ? parseInt(percent.replace(/\%/g,'')) : parseInt(percent)
  return (baseAmount * ( (100 - percentAmount) / 100 )).toString()
}

const calcNumberDiscount = ({ base, number }) => {
  const baseAmount = base.includes('.') ? parseInt(base.replace(/\./g,'')) : parseInt(base)
  const numberAmount = number.includes('.') ? parseInt(number.replace(/\./g,'')) : parseInt(number)
  return (baseAmount - numberAmount).toString()
}

const getEnv = (location) => {
  if(location.includes("homefilming.com")){
    return "production"
  } else if(location.includes("staging")){
    return "staging"
  } else {
    return "development"
  }
}


module.exports = {
  humanize, dateTimeShort, dateShort,
  formatPhone, calcPercentageDiscount,
  calcNumberDiscount, cleansePrice, getEnv
}
