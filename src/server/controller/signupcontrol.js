const User = require("../models/User");
const logger = require("../library/logger");
const { sendEmail } = require("../library/sendEmail");
const generator = require("generate-password");
const { formatResponse } = require("../library/formatResponse");
const { hashPassword } = require("../library/passwordManager");

exports.signUpControl = async (req, res) => {
  logger.info(`SignUp Control`);
  const { name, email, username } = req.body;
  /**check for existing email and username */
  let userexists = await User.findOne({ email: email, username: username });
  if (userexists) {
    return res
      .status(400)
      .json(formatResponse(true, 400, "User Already Exists", email));
  }
  /**register user  */
  const signupuser = async () => {
    console.log("sign up user method");
    let newuser = new User({
      name: name,
      email: email,
      username: username,
    });

    let usercreated = await User.create(newuser);
    let result;
    if (usercreated) {
      let _user = usercreated.toObject();
      delete _user.__v;
      delete _user._id;

      result = Promise.resolve(_user);
    } else {
      result = Promise.reject(
        formatResponse(true, 500, "User SignUp Error", null)
      );
    }
    return result;
  };
  /**send password email */
  const sendPasswordEmail = async (result) => {
    logger.info(`In send email:${result.email}`);
    /**generate random password */
    let password = generator.generate({
      length: 10,
      numbers: true,
      uppercase: true,
      symbols: true,
    });

    /**construct email options */
    let emailText = `
      <h1>Welcome to My-Twitter</h1>
      <h2>Your Key to my-twitter is</h2><br/>
      <h3>Password</h3>  <code>${password}</code>
    `;

    let mailOptions = {
      html: emailText,
      from: process.env.EMAIL,
      to: email,
      subject: "My-Twitter User Onboarding",
    };

    /**call send Email lib */
    let emailResult = await sendEmail(mailOptions);
    logger.info("Email result::", emailResult);

    let sendEmailResult;
    if (emailResult === "Email Sent") {
      /**save password against the user */
      let updatedPassword = await User.updateOne(
        { email: email },
        { password: await hashPassword(password) }
      );
      /**check if 1 doc was updated */
      let { n } = updatedPassword;
      logger.info(`${n} doc updated`);
      sendEmailResult =
        n === 1
          ? Promise.resolve({ ...result, Result: `Password ${emailResult}` })
          : Promise.reject(
              formatResponse(true, 500, "Internal Server Error", null)
            );
    } else {
      sendEmailResult = Promise.reject(
        formatResponse(true, 500, "Internal Server Error", emailResult)
      );
    }
    return sendEmailResult;
  };

  /**sign-up start */
  signupuser()
    .then(sendPasswordEmail)
    .then((response) => {
      res
        .status(200)
        .json(formatResponse(false, 200, "User Registered", response));
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
};
