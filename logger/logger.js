const winston = require("winston");
require("winston-mongodb");

dateFormat = () => {
  return new Date(Date.now()).toString();
};

const options = {
  from: new Date() - 10 * 60 * 1000,
  until: new Date(),
  limit: 10,
  start: 0,
  order: "desc",
  fields: ["message"],
};

// Ignore log messages if they have { private: true }
const ignorePrivate = winston.format((info, opts) => {
  if (info.private) {
    return false;
  }
  return info;
});

class Loggerservice {
  constructor(route) {
    this.log_data = null;
    this.route = route;
    const logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: `./log/${route}.log`,
          //log only error messages into file
          level: "error",
        }),
        new winston.transports.MongoDB({
          level: "error",
          db: process.env.DB_URL,
          options: { useUnifiedTopology: true },
          storeHost: true,
          collection: "errors_log",
          label: "error documents",
          // capped: true, // This sets the total limit of storage 10 10mb
          expireAfterSeconds: 1000 * 60 * 60 * 24 * 3, //3days
        }),
      ],
      rejectionHandlers: [
        new winston.transports.File({ filename: "rejections.log" }),
      ],
      exceptionHandlers: [
        new winston.transports.File({ filename: "/.log/exceptions.log" }),
      ],
      // exitOnError: false, //exits on error
      query: winston.query(options, function (err, results) {
        if (err) {
          console.log(err);
        } else {
          console.log(results);
        }
      }),
      format: winston.format.printf((info) => {
        ignorePrivate();
        let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${route}.log | Message: ${
          info.message
        } | `;

        message = info.obj
          ? message + `data:${JSON.stringify(info.obj)} | `
          : message;

        message = this.log_data
          ? message + `log_data:${JSON.stringify(this.log_data)} |`
          : message;

        return message;
      }),
    });
    this.logger = logger;
  }

  setLogData(log_data) {
    this.log_data = log_data;
  }
  async info(message) {
    this.logger.log("info", message);
  }
  async info(message, obj) {
    this.logger.log("info", message, {
      obj,
    });
  }
  async debug(message) {
    this.logger.log("debug", message);
  }
  async debug(message, obj) {
    this.logger.log("debug", message, {
      obj,
    });
  }
  async error(message) {
    this.logger.log("error", message);
  }
  async error(message, obj) {
    this.logger.log("error", message, {
      obj,
    });
  }
}

module.exports = Loggerservice;
