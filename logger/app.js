const express = require('express')
const bodyParser = require('body-parser');
const Logger = require('./logger');
const { allColors } = require('winston/lib/winston/config');


require('dotenv').config()

const app = express();

const logger = new Logger('app');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.all('*', (req, res, next) => {
  logger.info('Incoming request', { method: req.method})

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
    logger.error('Name field is empty')
    error['name'] = 'Name field is empty'
  }
  if (!age) {
    logger.error('Age field is empty')
    error['age'] = 'age field is empty'
  }
  if (!gender) {
    logger.error('gender field is empty')
    error['gender'] = 'gender fild is empty'
  }

  if (Object.keys(error).length != 0) {
    logger.error('Return error response', {
      'success': false
    })
    res.send('Error')
  } else {
    logger.info('Return success response', {
      'success': true
    })
    res.send('No Error')
  }

})


port = process.env.PORT
app.listen(port, function () {
  // console.log(`Listening on port ${port}...`)
  logger.info(`App launched on port ${port}...`)
}) 