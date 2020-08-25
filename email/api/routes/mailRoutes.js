const express = require('express');
const mailingRouter = express.Router();
const mailingController = require('../controller/mailingController');

function router() {
  const { sendMailtoLoneRecipients, sendMailtoMultipleRecipients, 
    sendMailWithTemplate, sendMailWithMailgenTemplate } = mailingController();

  mailingRouter.route('/sendmailToOne').post(sendMailtoLoneRecipients);
  mailingRouter.route('/sendmailToMany').post(sendMailtoMultipleRecipients);
  mailingRouter.route('/sendmailwithtemplate').post(sendMailWithTemplate);
  mailingRouter.route('/sendmailwithtemplate').post(sendMailWithMailgenTemplate);

  return mailingRouter
}

module.exports = router;