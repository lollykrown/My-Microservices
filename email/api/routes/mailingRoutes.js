const express = require('express');
const mailingRouter = express.Router();
const mailingController = require('../controller/mailingController');

function router() {
  const { sendMailtoLoneRecipient, sendMailtoMultipleRecipients, 
    sendMailWithTemplate, sendMailWithMailgenTemplate } = mailingController();

  mailingRouter.route('/sendmailToOne').post(sendMailtoLoneRecipient)
  .get((req, res) => {
    res.send('works')
  });
  mailingRouter.route('/sendmailToMany').post(sendMailtoMultipleRecipients);
  mailingRouter.route('/sendmailwithtemplate').post(sendMailWithTemplate);
  mailingRouter.route('/sendmailwithtemplate').post(sendMailWithMailgenTemplate);

  return mailingRouter;
}

module.exports = router;