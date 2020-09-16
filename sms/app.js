const express = require('express')
const bodyParser = require('body-parser');
require('dotenv').config()
const sendSms = require('./sms')
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello world!')
})
app.post('/test', (req, res)=>{
  const {phone, message} = req.body

  const sampleMessage = `Welcome to Parkwella! Your verification code is ${smsToken}`;
  const samplePhone = '07032460830'

  sendSms(samplePhone, sampleMessage)

})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

port = process.env.PORT
app.listen(port, function () {
  console.log(`Listening on port ${port}...`)
}) 