const {google} = require('googleapis');
const express = require('express');
const opn = require('open');
// const path = require('path');
// const fs = require('fs');
// const bodyParser = require('body-parser');
require('dotenv').config()

// const keyfile = path.join(__dirname, 'credentials.json');
// const keys = JSON.parse(fs.readFileSync(keyfile));
const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

const uris = JSON.parse(process.env.REDIRECT_URIS)

// Create an oAuth2 client to authorize the API call
const client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  uris[0]
);


// Generate the url that will be used for authorization
this.authorizeUrl = client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

const app = express();


// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))


app.get('/oauth2callback', (req, res) => {
  const code = req.query.code;

  console.log('code',code)

  client.getToken(code, (err, tokens) => {
    if (err) {
      console.error('Error getting oAuth tokens:');
      throw err;
    }
    client.credentials = tokens;
    res.send('Authentication successful! Please return to the console.');
    server.close();
    listMajors(client);
  });
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.send('error');
// });

port = process.env.PORT || 8081

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}...`)

    console.log('Authorize this app by visiting this url:', this.authorizeUrl);
  // open the browser to the authorize url to start the workflow
  // opn(this.authorizeUrl, {wait: false});
});

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1xGTbNEE_h3yzmtRsIB_vEa4_qneW-LseUk65pOjdbWo/edit?usp=sharing
 * 
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function listMajors(auth) {
  const sheets = google.sheets('v4');
  sheets.spreadsheets.values.get(
    {
      auth: auth,
      spreadsheetId: '1xGTbNEE_h3yzmtRsIB_vEa4_qneW-LseUk65pOjdbWo',
      range: 'Sheet1!A2:E',
    },
    (err, res) => {
      if (err) {
        console.error('The API returned an error.');
        throw err;
      }
      const rows = res.data.values;
      if (rows.length === 0) {
        console.log('No data found.');
      } else {
        console.log('Name, Home State, Major:');

        rows.slice(0,3).map(row => console.log(`${row[0]}, ${row[3]}, ${row[4]}`))
        // for (const row of rows) {
        //   // Print columns A and E, which correspond to indices 0 and 4.
        //   console.log(`${row[0]}, ${row[3]}, ${row[4]}`);
        // }
      }
    }
  );
}

