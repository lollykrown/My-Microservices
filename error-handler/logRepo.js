let fs = require('fs');

const FILE_NAME = 'log.txt';

let logRepo = {
  write: function (data, resolve, reject) {
    let toWrite = `${'*'.repeat(150)} \r\n`;
    toWrite += `Date/Time: ${new Date(Date.now()).toString()} \r\n`;
    toWrite += `Exception Info: ${JSON.stringify(data)} \r\n`;
    toWrite += `${'*'.repeat(150)} \r\n`;
    fs.appendFile(FILE_NAME, toWrite, function (err) {
      if (err) {
        reject(err);
      }
      else {
        resolve(true);
      }
    });
  }
};

module.exports = logRepo;