const createError = require("http-errors");
const express = require("express");
const debug = require("debug")("app:root");
const bobyParser = require("body-parser");
const QRCode = require("qrcode");
const QRReader = require("qrcode-reader");
const fs = require("fs");
// const jimp = require("jimp");

// init app
const app = express();

app.set("view engine", "ejs");

//fetch data from the reuqest
app.use(bobyParser.json());
app.use(bobyParser.urlencoded({ extended: false }));

// loading the Get page
app.get("/", (req, res) => {
  res.render("qrcode", { data: "" });
});

// loading the post page
app.post("/", (req, res) => {
  const { name } = req.body;
  QRCode.toDataURL(name, { errorCorrectionLevel: "H" }, (err, url) => {
    if (err) {
      debug(err);
    }
    debug("url", url);

    QRCode.toFile(
      "test.png",
      name,
      {
        errorCorrectionLevel: "H",
        color: {
          dark: "#00F", // Blue dots
          light: "#0000", // Transparent background
        },
      },
      (err) => {
        if (err) {
          debug(err);
        }
      }
    );
    res.render("qrcode", { data: url });
  });
  //   QRCode.toString(name, { errorCorrectionLevel: "H" }, (err, text) => {
  //     if (err) { debug(err)}
  //   debug('text', text);
  //   })
});

app.get("/decode", (req, res) => {
  (async function run() {
    try {
      const img = await jimp.read(fs.readFileSync("./test.png"));

    //   for (const point of value.points) {
    //     img.scan(Math.floor(point.x) - 5, Math.floor(point.y) - 5, 10, 10, function(x, y, idx) {
    //       // Modify the RGBA of all pixels in a 10px by 10px square around the 'FinderPattern'
    //       this.bitmap.data[idx] = 255; // Set red to 255
    //       this.bitmap.data[idx + 1] = 0; // Set blue to 0
    //       this.bitmap.data[idx + 2] = 0; // Set green to 0
    //       this.bitmap.data[idx + 3] = 255; // Set alpha to 255
    //     });
    //   }
      
    //   await img.writeAsync('./qr_photo_annotated.png');

      const qr = new QRReader();

      // qrcode-reader's API doesn't support promises, so wrap it
      const value = await new Promise((resolve, reject) => {
        qr.callback = (err, v) => (err != null ? reject(err) : resolve(v));
        qr.decode(img.bitmap);
      });

      // { result: 'http://asyncawait.net',
      //   points:
      //     [ FinderPattern {
      //         x: 68.5,
      //         y: 252,
      //         count: 10,
      // ...
      debug('val',value);

      // http://asyncawait.net
      debug('res',value.result);
      res.send(value.result);
    } catch (e) {
      debug('error', e.stack);
    }
  })();
});
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

//Assign port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => debug(`Server is Starting on http://localhost:${PORT}`));
