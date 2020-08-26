const express = require('express')
const bodyParser = require('body-parser');
const Logger = require('./logger');


require('dotenv').config()

const app = express();

const logger = new Logger('app');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.post('/test', (req, res)=>{
  const body = req.body

  let error = {}

  logger.setLogData(body)

  logger.info('Request received at /test', req.body)

  if (body.name == null || body.name == '') {
    logger.error('Name fild is empty')
    error['name'] = 'Name fild is empty'
  }
  if (body.age == null || body.age == '') {
    logger.error('age fild is empty')
    error['age'] = 'age fild is empty'
  }
  if (body.gender == null || body.gender == '') {
    logger.error('gender fild is empty')
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
  console.log(`Listening on port ${port}...`)
}) 