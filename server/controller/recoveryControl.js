const User = require("../models/User");
const logger = require("../library/logger");
const { formatResponse } = require("../library/formatResponse");
const { sendEmail } = require("../library/sendEmail");
const { hashPassword, comparePassword } = require("../library/passwordManager");

const getRecoveryCode = async (req, res) => {
  logger.info("Get RecoveryCode Control");
  const { loginId } = req.body;
  let query;
  /**format search query (loginId can be email or username)*/
  if (loginId.includes("@")) {
    query = {
      email: loginId,
    };
  } else {
    query = {
      username: loginId,
    };
  }
  /**user existence */
  let userExistence = await User.findOne(query);
  if (userExistence) {
    const { email } = userExistence;
    /**generate recovery code */
    let recoveryCode = parseInt(Math.random() * 1000000, 10);
    console.log("code::", recoveryCode);
    /**save recovery code */
    let updated = await User.updateOne(query, { recoveryCode: recoveryCode });
    let { n } = updated;
    logger.info(`${n} doc updated`);
    /**send email */
    if (n === 1) {
      /**construct email options */
      let emailText = `
        <h1>You have initiated password recovery operation</h1>
        <h2>Your RecoveryCode is</h2>
        <code>${recoveryCode}</code>
      `;

      let mailOptions = {
        html: emailText,
        from: process.env.EMAIL,
        to: userExistence.email,
        subject: "My-Twitter Password Recovery",
      };

      /**call send Email lib */
      let emailResult = await sendEmail(mailOptions);
      logger.info("RecoveryEmail result::", emailResult);

      if (emailResult === "Email Sent") {
        res
          .status(200)
          .json(formatResponse(false, 200, "Recovery Email Sent", email));
      } else {
        res
          .status(500)
          .json(formatResponse(true, 500, "Internal Server Error", null));
      }
    }
  } else {
    res.status(404).json(formatResponse(true, 400, "User Not Found", loginId));
  }
};
const resetPassword = async (req, res) => {
  logger.info("Reset Password Control");
  const {
    email,
    recoveryCode,
    password,
    currentPassword,
    operation,
  } = req.body;

  /**user existence */
  const userExistence = async (email) => {
    let userExists = await User.findOne({ email: email });
    return userExists
      ? Promise.resolve(userExists)
      : Promise.reject(formatResponse(true, 404, "User NOt Found", email));
  };
  /**code or current password match  */
  const codeValidity = async (user) => {
    if (operation === "reset") {
      return recoveryCode === user.recoveryCode
        ? Promise.resolve(true)
        : Promise.reject(formatResponse(true, 401, "Not Valid Code", null));
    } else {
      return (await comparePassword(currentPassword, user.password))
        ? Promise.resolve(true)
        : Promise.reject(
            formatResponse(true, 401, "current password is not valid", null)
          );
    }
  };
  /**update password */
  const updatePassword = async () => {
    let query = { email: email };
    let updateOptions = {
      password: await hashPassword(password),
      recoveryCode: "",
    };
    let updatedPassword = await User.updateOne(query, updateOptions);
    let { n } = updatedPassword;
    n === 1
      ? Promise.resolve(true)
      : Promise.reject(
          formatResponse(true, 500, "Internal Server Error", null)
        );
  };

  userExistence(email)
    .then(codeValidity)
    .then(updatePassword)
    .then((result) => {
      res
        .status(200)
        .json(formatResponse(false, 200, "Password Reset Success", email));
    })
    .catch((error) => {
      logger.warn("Error::", error);
      res.status(error.status).json(error);
    });
};
module.exports = {
  getRecoveryCode,
  resetPassword,
};
