const express = require('express')
const morgan = require('morgan'); //logger
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config()

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('tiny'))


const mailingRouter = require('./api/routes/mailingRoutes')();

app.use('/v1', mailingRouter);


port = process.env.PORT
app.listen(port, function () {
  console.log(`Listening on port ${port}...`)
}) 