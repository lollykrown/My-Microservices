const debug = require('debug')('app:sms')
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = function sendSms(phone, message) {
    client.messages
      .create({
         body: message,
         from: process.env.TWILIO_NUMBER,
         to: phone
       })
      .then(message => {
        debug(message)
      })
      .catch(err => debug(err))
  }
