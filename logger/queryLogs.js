const winston = require("winston");
const logFilename = __dirname + "/app_root.log";

const options = {
  from: new Date() - 10 * 60 * 1000,
  until: new Date(),
  limit: 10,
  start: 0,
  order: "desc",
  fields: ["message"],
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


// const Helpers = use('Helpers')
// const Logger = use('Logger')
// const Winston = Helpers.promisify(Logger._loggerInstances.file.driver.logger)

// class LogController {
	
// 	async index({response, view}) {
		
// 		//lastday
// 		const options = {
// 			from: new Date() - (24 * 60 * 60 * 1000),
// 			until: new Date(),
// 			limit: 100,
// 			start: 0,
// 			order: 'desc',
// 			fields: ['message']
// 			};
			
// 			const result = await Winston.query(options)
		  
// 			console.log(result)
// 			// return view.render('logs', {logs:result})
// 			return response.send({logs:result})
// 	}
// }

// module.exports = LogController