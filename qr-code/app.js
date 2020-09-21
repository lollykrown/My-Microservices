const createError = require("http-errors");
const express = require("express");
const debug = require("debug")("app:root");
const bobyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const QRCode = require("qrcode");

// init app
const app = express();

app.set("view engine", "ejs");

//fetch data from the reuqest
app.use(bobyParser.json());
app.use(bobyParser.urlencoded({ extended: false }));

// loading the Get page
app.get("/", (req, res) => {
      res.render("qrcode", { data: '' });
});

// loading the post page
app.post("/", (req, res) => {
    const { name } = req.body
    QRCode.toDataURL(name, { errorCorrectionLevel: "H" }, (err, url) => {
        if (err) { debug(err)}
      debug('url', url);
      qrcode.toString(name, { errorCorrectionLevel: "H" }, (err, text) => {
        if (err) { debug(err)}
      debug('text', text);
      })
    res.render("qrcode", { data: url});
    })
    // QRCode.toFile('test.png', name, {
    //     color: {
    //       dark: '#00F',  // Blue dots
    //       light: '#0000' // Transparent background
    //     }
    //   }, function (err) {
    //     if (err) throw err
    //     console.log('done')
    //     res.send('success')
    //   })
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
app.listen(PORT, () =>
  debug(`Server is Starting on http://localhost:${PORT}`)
);
