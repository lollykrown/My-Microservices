let fs = require('fs');

const FILE_NAME = 'log.txt';

let logRepo = {
  write: function (data, resolve, reject) {
    let toWrite = `${'*'.repeat(230)} \r\n`;
    toWrite += `Date/Time: ${new Date(Date.now()).toString()} \r\n`;
    toWrite += `Exception Info: ${JSON.stringify(data)} \r\n`;
    toWrite += `${'*'.repeat(230)} \r\n`;
    fs.appendFile(FILE_NAME, toWrite, function (err) {
      if (err) {
        reject(err);
      }
      else {
        resolve(true);
      }
    });
  },
  writeJson: function (da, resolve, reject) {
    let data = JSON.stringify(da);
    fs.appendFile('access_data.json', data, function (err) {
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