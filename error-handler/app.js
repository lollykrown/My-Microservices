const express = require("express");
const bodyParser = require("body-parser");
let errorHelper = require("./errorHelpers");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/test", (req, res) => {
  const { name, age, gender } = req.body;

  if (!name) {
    return res.status(400).json({
      status: 400,
      statusText: "Name not provided",
      message: "Name param must be provided",
      error: {
        code: "NOT_FOUND",
        message: "Name param must be provided",
      }
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
      }
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
      }
    });
  }

  res.send({
    status: true,
    message: "success",
  });
});

// Configure exception logger
app.use(errorHelper.logErrors);
// Configure client error handler
app.use(errorHelper.clientErrorHandler);
// Configure catch-all exception middleware last
app.use(errorHelper.errorHandler);

port = process.env.PORT;
app.listen(port, function () {
  // console.log(`Listening on port ${port}...`)
  console.log(`App launched on port ${port}...`);
});
