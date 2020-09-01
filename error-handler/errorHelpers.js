const logRepo = require("./logRepo");
const debug = require('debug')('app:Error-helpers')

let errorHelpers = {
  logErrors: function (err, req, res, next) {
    let errorObject = errorHelpers.errorBuilder(err);
    errorObject.requestInfo = {
      "hostname": req.hostname,
      "path": req.path,
      "app": req.app,
    }
    logRepo.write(errorObject, function (data) {
      debug(data);
    }, function (err) {
      debug(err);
    });
    next(err)
  },
  clientErrorHandler: function (err, req, res, next) {
    if (req.xhr) {
      debug('Internal Server Error')
      res.status(500).send({
        "status": 500,
        "statusText": "Internal Server Error",
        "message": "XMLHttpRequest error",
        "error": {
          "errno": 0,
          "call": "XMLHttpRequest Call",
          "code": "INTERNAL_SERVER_ERROR",
          "message": "XMLHttpRequest error"
        }
      });
    } else {
      next(err);
    }
  },
  errorHandler: function (err, req, res, next) {
    res.status(500).json(errorHelpers.errorBuilder(err));
  },
  errorBuilder: function (err) {
    debug(err.message)
    return {
      "status": 500,
      "statusText": "Internal Server Error",
      "message": err.message,
      "error": {
        "errno": err.errno,
        "call": err.syscall,
        "code": "INTERNAL_SERVER_ERROR",
        "message": err.message
      }
    };
  }
};

module.exports = errorHelpers;