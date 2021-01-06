const debug = require("debug")("app:mailingController");
const nodemailer = require("nodemailer");
const validator = require("email-validator");
const Mailgen = require("mailgen"); //Template generator
const body = require('./dc_template')

const validateEmail = (emails) => {
  let toValidate =  typeof(emails) === 'string' ? emails.split(",") : emails;

  for (email of toValidate) {
    if (!validator.validate(email)) return false;
  }
  return true;
};

let mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Lollykrown",
    link: process.env.DEV_HOST_URL,
    // logo: "http://lollykrown.herokuapp.com/img/logo.png",
    copyright: "Copyright © 2020 Lollykrown. All rights reserved.",
  },
});

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

function mailingController() {
  function sendMail(req, res) {
    (async function mail() {
      try {
        let {
          recipient_email,
          sender_name,
          sender_email,
          subject,
          body,
        } = req.body;
        debug(recipient_email, sender_name, sender_email, subject, body);

        if (!recipient_email) {
          res.status(400).send({
            status: "failed",
            data: { message: "Add recipients email" },
          });
          return;
        }
        if (!sender_name) {
          res.status(400).send({
            status: "failed",
            data: { message: "Add Sender's name" },
          });
          return;
        }
        if (!sender_email) {
          res.status(400).send({
            status: "failed",
            data: { message: "Add Sender's email" },
          });
          return;
        }
        if (!subject) {
          res.status(400).send({
            status: "failed",
            data: { message: "Add email subject." },
          });
          return;
        }
        if (!body) {
          res.status(400).send({
            status: "failed",
            data: { message: "Add email body." },
          });
          return;
        }

        let emailsAreValid = validateEmail(recipient_email);
        if (!emailsAreValid) {
          res.status(400).send({
            status: "failed",
            data: { message: "Invalid email(s)!" },
          });
        } else {
          let from = `${sender_name} <${sender_email}>`;
          let mailOptions = {
            from: from,
            to: recipient_email,
            cc: [],
            bcc: [],
            subject: subject,
            text: body,
          };

          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              res.status(500).send({
                status: "failed",
                data: { message: "An unknown error occured!" },
              });
              debug(err);
            }
            debug(`Email sent: ${info.response}`);
            res
              .status(200)
              .json({
                status: "success",
                data: { message: "mail sent successfully" },
              });
          });
          //
        }
      } catch (err) {
        debug(err.stack);
      }
    })();
  }

  function sendMailWithTemplate(req, res) {
    (async function mail() {
      try {
        let {
          recipient_email,
          sender_name,
          sender_email,
          subject,
          body,
        } = req.body;
        debug(recipient_email, sender_name, sender_email, subject, body);

        if (!recipient_email) {
          res.status(400).send({
            status: "failed",
            data: { message: "Add recipients email" },
          });
          return;
        }
        if (!sender_name) {
          res.status(400).send({
            status: "failed",
            data: { message: "Add Sender's name" },
          });
          return;
        }
        if (!sender_email) {
          res.status(400).send({
            status: "failed",
            data: { message: "Add Sender's email" },
          });
          return;
        }
        if (!subject) {
          res.status(400).send({
            status: "failed",
            data: { message: "Add email subject." },
          });
          return;
        }
        if (!body) {
          res.status(400).send({
            status: "failed",
            data: { message: "Add email body." },
          });
          return;
        }

        let emailsAreValid = validateEmail(recipient_email);
        if (!emailsAreValid) {
          res.status(400).send({
            status: "failed",
            data: { message: "Invalid email!" },
          });
        } else {
          let from = `${sender_name} <${sender_email}>`;
          let mailOptions = {
            from: from,
            to: recipient_email,
            cc: [],
            bcc: [],
            subject: subject,
            html: body,
          };

          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              res.status(500).send({
                status: "failed",
                data: { message: "An unknown error occured!" },
              });
              debug(err);
            }
            debug(`Email sent: ${info.response}`);
            res
              .status(200)
              .json({
                status: "success",
                data: { message: "mail sent successfully" },
              });
          });
          //
        }
      } catch (err) {
        debug(err.stack);
      }
    })();
  }

  function sendMailWithMailgenTemplate(req, res) {
    (async function mail() {
      try {
        let {
          recipient_email,
          sender_name,
          sender_email,
          subject,
          body,
        } = req.body;

        if (!recipient_email) {
          res.status(400).send({
            status: "failed",
            data: { message: "Add recipients email" },
          });
          return;
        }
        if (!sender_name) {
          res.status(400).send({
            status: "failed",
            data: { message: "Add Sender's name" },
          });
          return;
        }
        if (!sender_email) {
          res.status(400).send({
            status: "failed",
            data: { message: "Add Sender's email" },
          });
          return;
        }
        if (!subject) {
          res.status(400).send({
            status: "failed",
            data: { message: "Add email subject." },
          });
          return;
        }
        if (!body) {
          res.status(400).send({
            status: "failed",
            data: { message: "Add email body." },
          });
          return;
        }

        let emailsAreValid = validateEmail(recipient_email);
        if (!emailsAreValid) {
          res.status(400).send({
            status: "failed",
            data: { message: "Invalid email!" },
          });
        } else {
          let from = `${sender_name} <${sender_email}>`;

          const url = "http://lollykrown.xyz"; //example

          const emailContent = {
            body: {
              name: "Amazing Nigerian",
              intro:
                "Welcome to Lollykrown! We're very excited to have you on board.",
              greeting: "Hello",
              signature: "Sincerely",
              action: {
                instructions:
                  "To get started with Lollykrown, please confirm your account below",
                button: {
                  color: "#fcac29",
                  text: "Confirm your account",
                  link: url,
                },
              },
              outro:
                "Need help, or have questions? Just reply to this email, we'd love to help.",
            },
          };

          // Generate an HTML email with the provided contents
          let emailBody = mailGenerator.generate(emailContent);

          // Generate the plaintext version of the e-mail (for clients that do not support HTML)
          let emailText = mailGenerator.generatePlaintext(emailContent);

          const mailOptions = {
            from: from,
            to: recipient_email,
            cc: [],
            bcc: [],
            subject: subject,
            html: emailBody,
            text: emailText,
          };

          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              res.status(500).send({
                status: "failed",
                message: "An unknown error occured!",
              });
              debug(err);
            }
            debug(`Email sent: ${info.response}`);
            res
              .status(200)
              .json({ status: "success", message: "mail sent successfully" });
          });
        }
      } catch (err) {
        debug(err.stack);
      }
    })();
  }

  function sendDCMail(req, res) {
    (async function mail() {
      try {

        const sender_name = "RCCG Discovery Centre";
        const subject = "RCCGDC Monthly Bulletin";
        const recipient_email = "RCCGDC Bulletin Subscribers <editorial.discovery@gmail.com>";
        const bcc_recipients = [
          "odusanyafemi65@gmail.com",
          "easyplussolutions@gmail.com",
          "booqie001@gmail.com",
          "spiritbeing.jeremiah@gmail.com",
          "viktuur24@gmail.com",
          "lollykrown@gmail.com",
          "joe_kayu@yahoo.com",
          "phemos9studio@gmail.com",
          "oni_babatunde@yahoo.com",
        ];

        const sender_email = "editorial.discovery@gmail.com";
        const test = ['joe_kayu@yahoo.com', 'lollykrown@gmail.com'];

        let emailsAreValid = validateEmail(test);
        if (!emailsAreValid) {
          debug("valid?", emailsAreValid);
          res.status(400).send({
            status: "failed",
            data: { message: "Invalid email!" },
          });
        } else {
          let from = `${sender_name} <${sender_email}>`;
          let mailOptions = {
            from: from,
            to: recipient_email,
            cc: [],
            bcc: bcc_recipients,
            subject: subject,
            text: "Plaintext version of the message",
            html: body,
            attachments: [
              {   
                filename: 'Bulletin.pdf',
                path: './api/controller/bulletin.pdf' 
            },
            ]
          };

          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              res.status(500).send({
                status: "failed",
                data: { message: "An unknown error occured!" },
              });
              debug(err);
            }
            debug(`Email sent: ${info.response}`);
            res
              .status(200)
              .json({
                status: "success",
                data: { message: "mail sent successfully" },
              });
          });
          //
        }
      } catch (err) {
        debug(err.stack);
      }
    })();
  }
  return {
    sendMail,
    sendMailWithTemplate,
    sendMailWithMailgenTemplate,
    sendDCMail,
  };
}

module.exports = mailingController;
