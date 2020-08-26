const debug = require('debug')('app:mailingController');
const nodemailer = require('nodemailer');
const validator = require("email-validator");

const validateEmail = (emails) => {
  const emailList = emails.split(',');
  for (email of emailList) {
    if (!validator.validate(email))
      return false
  }
  return true;
}

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD
  }
});

function mailingController() {
  function sendMail(req, res) {
    (async function mail() {
      try {
        let { name, email, message } = req.body;
        debug(name, email, message);

        if (!name) {
          res.status(400).send({
            status: 'failed',
            data: { message: 'Please provide your name' }
          })
          return
        }
        if (!email) {
          res.status(400).send({
            status: 'failed',
            data: { message: 'Please provide your email address' }
          })
          return
        }
        if (!message) {
          res.status(400).send({
            status: 'failed',
            data: { message: 'Add message body.' }
          })
          return
        }

        let emailsAreValid = validateEmail(email);
        if (!emailsAreValid) {
          res.status(400).send({
            status: 'failed',
            data: { message: 'Invalid email(s)!' }
          })
        } else {
          let from = `Contact Form Mailer <kay.nazirite@gmail.com>`;
          let mailOptions = {
            from: from,
            to: process.env.SITE_OWNER_EMAIL,
            cc: [],
            bcc: [],
            subject: `Message from ${name}`,
            text: `
            Sender's name: ${name}
            Sender's email: ${email}

            ${message}
            
            regards,
            NodeJs contact form microservice
            `,
          };

          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              res.status(500).send({
                status: 'failed',
                data: { message: 'An unknown error occured!' }
              });
              debug(err);
            }
            debug(`Email sent: ${info.response}`);
            res.status(200).json({ status: 'success', data: { message: 'mail sent successfully' } });
          })
          //
        }
      } catch (err) {
        debug(err.stack)
      }
    }());
  }

return {
  sendMail
};
}

module.exports = mailingController;