const express = require('express');
const mailingRouter = express.Router();
const mailingController = require('../controller/mailingController');

function router() {
  const { sendMail } = mailingController();

  mailingRouter.route('/sendmail').post(sendMail);

  return mailingRouter;
}

module.exports = router;