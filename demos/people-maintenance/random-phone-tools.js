const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

function getRandomPhone(){
  const RNphone = Math.floor(2000000000 + Math.random() * 9000000000)
  const phone = RNphone+"";
  const number = phoneUtil.parse(phone, 'US');
  const formattedPhone = phoneUtil.format(number, PNF.NATIONAL)
  return formattedPhone; 
}

module.exports = { getRandomPhone };