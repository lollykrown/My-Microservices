const {google} = require('googleapis');
const express = require('express');
const opn = require('open');
// const path = require('path');
// const fs = require('fs');
// const bodyParser = require('body-parser');
require('dotenv').config()

// const keyfile = path.join(__dirname, 'credentials.json');
// const keys = JSON.parse(fs.readFileSync(keyfile));
const scopes = ['https://www.googleapis.com/auth/spreadsheets','https://www.googleapis.com/auth/drive'];

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
    appendValues(client);
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

const create = (auth) => {
  const sheets = google.sheets('v4');

  const resource = {
    properties: {
      title: 'Sample'
    },
    sheets: [
      {
        sheetId: 1,
        title: 'Sheet1',
        index: 0,
        // tabColor: {
        //   object (Color)
        // },
      }
    ]
  };

  sheets.spreadsheets.create(
    {
      auth: auth,
      resource,
      fields: 'spreadsheetId',
    },
    (err, res) => {
      if (err) {
        console.error('The API returned an error.');
        throw err;
      }
      console.log(`Spreadsheet ID: ${res.data.spreadsheetId}`);

    }
  );
}

const read = (auth) => {
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
      }
    }
  );
}

const readMultiple = (auth) => {
  const sheets = google.sheets('v4');
  
  sheets.spreadsheets.values.batchGet(
    {
      auth: auth,
      spreadsheetId: '1xGTbNEE_h3yzmtRsIB_vEa4_qneW-LseUk65pOjdbWo',
      ranges: ['Sheet1!A2:E4', 'Sheet1!A5:E11'],
    },
    (err, res) => {
      if (err) {
        console.error('The API returned an error.');
        throw err;
      }
      const rows = res.data.valueRanges;
      if (rows.length === 0) {
        console.log('No data found.');
      } else {
        console.log(`First Range: ${rows[0].values}, Second Range: ${rows[1].values}`);

     }
    }
  );
}
const update = (auth) => {
  const sheets = google.sheets('v4');

  let values = [
    ["Item", "Cost", "Stocked", "Ship Date"],
    ["Wheel", "$20.50", "4", "3/1/2016"],
    ["Door", "$15", "2", "3/15/2016"],
    ["Engine", "$100", "1", "3/20/2016"],
    ["Totals", "=SUM(B2:B4)", "=SUM(C2:C4)", "=MAX(D2:D4)"]
    // Additional rows ...
  ];
  const resource = {
    values,
  };
  const option = { raw: 'RAW', userEntered: 'USER_ENTERED'}
  sheets.spreadsheets.values.update(
    {
      auth: auth,
      spreadsheetId: '18IWXGB_KKeC3-tV2oRJGTjNvvftRossIRyqGhfY4SCU',
      range: 'Sheet1!A1:D5',
      valueInputOption: option.userEntered,
      resource,
    },
    (err, res) => {
      if (err) {
        console.error('The API returned an error.');
        throw err;
      }
     
      console.log(`${res.data.updatedCells} cells updated on cell range: ${res.data.updatedRange}.`);

    }
  );
}

const updateMultiple = (auth) => {
  const sheets = google.sheets('v4');
  
  const data = [
      {
        range: "Sheet1!A1:D1",
        values: [
          ["Item", "Cost", "Stocked", "Ship Date"],
        ]
      },
      {
        range: "Sheet1!A2:D4",
        values: [
          ["Wheel", "$20.50", "4", "3/1/2016"],
          ["Door", "$15", "2", "3/15/2016"],
          ["Engine", "$100", "1", "3/20/2016"],
        ]
      },
      {
        range: "Sheet1!A6:D6",
        values: [
          ["Totals", "=SUM(B2:B4)", "=SUM(C2:C4)", "=MAX(D2:D4)"]
        ]
      },
      {
        range: "Sheet2!A1:D5",
        values: [ ["Item", "Cost", "Stocked", "Ship Date"],
        ["Wheel", "$20.50", "4", "3/1/2016"],
        ["Door", "$15", "2", "3/15/2016"],
        ["Engine", "$100", "1", "3/20/2016"],
        ["Totals", "=SUM(B2:B4)", "=SUM(C2:C4)", "=MAX(D2:D4)"]]
      },
    ];
    
  const option = { raw: 'RAW', userEntered: 'USER_ENTERED'}

  const resource = {
    data,
    valueInputOption: option.userEntered,
  };
  sheets.spreadsheets.values.batchUpdate(
    {
      auth: auth,
      spreadsheetId: '18IWXGB_KKeC3-tV2oRJGTjNvvftRossIRyqGhfY4SCU',
      resource,
    },
    (err, res) => {
      if (err) {
        console.error('The API returned an error.');
        throw err;
      }
     
      console.log(`${res.data.responses[0].updatedCells} cells updated on cell range: ${res.data.responses[0].updatedRange}.
      \n\n
      ${res.data.responses[1].updatedCells} cells updated on cell range: ${res.data.responses[1].updatedRange}.`);

    }
  );
}

const appendValues = (auth) => {
  const sheets = google.sheets('v4');

  let values = [
    [ 'Lollykrown',	'Male',	'4. Senior',	'MI',	'Math',	'Debate'],
    ['Robert',	'Male',	'1. Freshman',	'CA',	'English',	'Track & Field'],
    ['Sean',	'Male',	'1. Freshman',	'NH',	'Physics',	'Track & Field'],
    ['Stacy',	'Female',	'1. Freshman',	'NY',	'Math',	'Baseball'],
    ['Thomas',	'Male',	'2. Sophomore',	'RI',	'Art',	'Lacrosse'],
  ]
  const resource = {
    values,
  };
  const option = { raw: 'RAW', userEntered: 'USER_ENTERED'}
  sheets.spreadsheets.values.append(
    {
      auth: auth,
      spreadsheetId: '1xGTbNEE_h3yzmtRsIB_vEa4_qneW-LseUk65pOjdbWo',
      range: 'Sheet1!A1:F',
      valueInputOption: option.raw,
      resource,
    },
    (err, res) => {
      if (err) {
        console.error('The API returned an error.');
        throw err;
      }
      console.log(`${res.data.updates.updatedCells} cells updated on cell range: ${res.data.updates.updatedRange}.`);

    }
  );
}

//Visit https://developers.google.com/sheets/api/samples/data 
// and https://developers.google.com/sheets/api/guides/create
// https://codelabs.developers.google.com/codelabs/sheets-api#0
// for other excell sheet manipulation codes
