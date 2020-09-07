const express = require("express");
const bodyParser = require("body-parser");
let errorHelper = require("./errorHelpers");
const nodemailer = require("nodemailer");
const be = require("./spotify_songs.json");
const debug = require("debug")("app:root");
const logRepo = require("./logRepo");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Home");
});

app.post("/test", (req, res) => {
  const { name, age, gender } = req.body;

  //intentional error on next line to trigger an error
  const yu = fetch("url");

  if (!name) {
    return res.status(400).json({
      status: 400,
      statusText: "Name not provided",
      message: "Name param must be provided",
      error: {
        code: "NOT_FOUND",
        message: "Name param must be provided",
      },
    });
  }
  if (!age) {
    return res.status(400).json({
      status: 400,
      statusText: "age not provided",
      message: "age param must be provided",
      error: {
        code: "NOT_FOUND",
        message: "age param must be provided",
      },
    });
  }
  if (!gender) {
    return res.status(400).json({
      status: 400,
      statusText: "gender not provided",
      message: "gender param must be provided",
      error: {
        code: "NOT_FOUND",
        message: "gender param must be provided",
      },
    });
  }

  res.send({
    status: true,
    message: "success",
  });
});

app.get("/read-file", (req, res) => {
  (async function auth() {
    try {
      const newArr = await be.map((item) => {
          return (item = {
            category: 'music',
            subcategory: item.playlist_name,
            title: item.track_name,
            artist: item.artist_name,
            album: item.album_name,
            keyMode: item.key_mode,
            durationMs: item.duration_ms,
            imgUrls: item.playlist_img,
            albumImg: item.album_img,
            id: item.FIELD1,
            trackUri: item.track_uri,
            inCart: false,
            count: 0,
            total: 0,
          });
      });

      const filtered = await newArr.filter(function (el) {
        return el != null;
      });

      logRepo.writeJson('data/spotify_songs.json',filtered, function (data) {
          debug(data);
        },
        function (err) {
          debug(err);
        }
      );
      res.status(200).json({
        status: true,
        message: "success",
        data: be,
      });
    } catch (err) {
      debug(err.stack);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  })();
});

// Configure exception logger
app.use(errorHelper.logErrors);
// Configure client error handler
app.use(errorHelper.clientErrorHandler);
// Configure catch-all exception middleware last
app.use(errorHelper.errorHandler);

const transport = nodemailer.createTransport({
  // [1]
  service: "Gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

if (process.env.NODE_ENV === "production") {
  // [2]
  process.on("uncaughtException", function (er) {
    console.error(er.stack); // [3]
    transport.sendMail(
      {
        from: process.env.USER,
        to: "joe_kayu@yahoo.com",
        subject: er.message,
        text: er.stack, // [4]
      },
      function (er) {
        if (er) console.error(er);
        process.exit(1); // [5]
      }
    );
  });
}

port = process.env.PORT;
app.listen(port, function () {
  // console.log(`Listening on port ${port}...`)
  console.log(`App launched on port ${port}...`);
});
