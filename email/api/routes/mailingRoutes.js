const express = require('express');
const mailingRouter = express.Router();
const mailingController = require('../controller/mailingController');

function router() {
  const { sendMail, sendMailWithTemplate, sendMailWithMailgenTemplate } = mailingController();

  mailingRouter.route('/sendmail').post(sendMail);
  mailingRouter.route('/sendmailwithtemplate').post(sendMailWithTemplate);
  mailingRouter.route('/sendmailwithmailgen').post(sendMailWithMailgenTemplate);

  return mailingRouter;
}

module.exports = router;