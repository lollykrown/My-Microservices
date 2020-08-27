const winston = require('winston')
const logFilename = __dirname + '/app_root.log';

// const logger = new (winston.Logger)({
//     transports: [
//         new (winston.transports.File)({
//             filename:  logFilename,
//             timestamp: true
//         })
//     ]
// });

const options = {
    from: new Date() - (10 * 60 * 1000),
    until: new Date(),
    limit: 10,
    start: 0,
    order: 'desc',
    fields: ['message']
  };
   
  //
  // Find items logged between today and yesterday.
  //
  function query() {
  winston.logger.query(options, function (err, results) {
    if (err) {
      /* TODO: handle me */
      throw err;
    }
   
    console.log(results);
  });
  }
  module.exports = query;