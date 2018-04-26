const AppError = require('./appErrors').createAppError

const mustHaveId = (id) => {
  try{
    if (!id){
      throw( AppError( {
        type: `Utils.MissingID`,
        message: `Missing required ID.`
      } ) )
    }
  }
  catch(e){
    return e
  }
  return id
}

const utcDateString = (time) => {
  function pad(val, len) {
    val = String(val);
    len = len || 2;
    while (val.length < len) val = "0" + val;
    return val;
  }

  var now = new Date();
  now.setTime(time);

  var utc = new Date(
    Date.UTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    )
  );

  var cDate  = utc.getDate();
  var cMonth = utc.getMonth();
  var cYear  = utc.getFullYear();
  var cHour  = utc.getHours();
  var cMin   = utc.getMinutes();
  var cSec   = utc.getSeconds();

  var result = cYear + '/' + pad((cMonth + 1)) + '/' + pad(cDate);
  result += ' ' + pad(cHour) + ':' + pad(cMin) + ':' + pad(cSec) + '+00:00';

  return result;
};

const discountToNumber = (discount, amount) => {
  if(discount.includes('%')){
    const cleanDiscount = parseInt(discount.replace(/\%/g,''))
    return (amount * ( (100 - cleanDiscount) / 100 ))
  } else {
    const cleanDiscount = discount.includes('.') ? parseInt(discount.replace(/\./g,'')) : parseInt(discount)
    return amount - cleanDiscount
  }
}

module.exports = { mustHaveId, utcDateString, discountToNumber }
