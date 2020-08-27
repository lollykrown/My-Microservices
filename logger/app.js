const express = require('express')
const bodyParser = require('body-parser');
const Logger = require('./logger');
const morgan = require('morgan');
require('dotenv').config()

const app = express();

const logger = new Logger('app_root');

//using the logger and its configured transports, to save the logs created by Morgan
const myStream = {
  write: (text) => {
      logger.info(`From Morgan: ${text}`)
  }
}

app.use(morgan('combined', { stream: myStream }));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.all('*', (req, res, next) => {
  const url = req.protocol + '://' + req.get('host') + req.originalUrl;
  logger.info('Incoming request', { method: req.method, url})

  logger.debug('Incoming request verbose', {
    headers: req.headers.host,
    query: req.query,
    body: req.body
  });
  next();
})

app.post('/test', (req, res)=>{
  const {name, age, gender} = req.body

  let error = {}

  logger.setLogData(req.body)

  logger.info('Request received at /test', req.body)

  if (!name) {
    logger.error('Name field is empty', {msg: 'error from name input'})
    error['name'] = 'Name field is empty'
  }
  if (!age) {
    logger.error('Age field is empty')
    error['age'] = 'age field is empty'
  }
  if (!gender) {
    logger.error('Gender field is empty')
    error['gender'] = 'gender fild is empty'
  }

  if (Object.keys(error).length != 0) {
    logger.error('Error response', {
      status: false,
      message: 'unsuccessful'
    })
    res.send('Error')
  } else {
    logger.info('Success response', {
      status: true,
      message: 'success'
    })
    res.send('No Error')
  }

})

const options = {
  from: new Date() - (24 * 60 * 60 * 1000),
  until: new Date(),
  limit: 10,
  start: 0,
  order: 'desc',
  fields: ['message']
};

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // add this line to include winston logging
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

port = process.env.PORT
app.listen(port, function () {
  // console.log(`Listening on port ${port}...`)
  logger.info(`App launched on port ${port}...`)
}) 