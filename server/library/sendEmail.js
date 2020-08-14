const nodemailer = require("nodemailer");
const logger = require("./logger");

exports.sendEmail = async (mailOptions) => {
  logger.debug(`Sending Email`);
  let sendEmailResult;

  /**init transport */
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });
  /**config mail options */
  //console.log("EmailText::", mailOptions);

  /**send email */
  let sentInfo = await transporter.sendMail(mailOptions);

  if (sentInfo) {
    sendEmailResult = "Email Sent";
  } else {
    sendEmailResult = "Error Sending Email";
  }
  console.log("Email Sent?", sendEmailResult);
  return sendEmailResult;
};
