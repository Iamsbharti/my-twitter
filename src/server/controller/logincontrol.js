const User = require("../models/User");
const { generateToken } = require("../library/generateAuthToken");
const logger = require("../library/logger");
const { comparePassword } = require("../library/passwordManager");
const { formatResponse } = require("../library/formatResponse");

exports.logincontrol = async (req, res) => {
  logger.info("Login Control");
  const { loginId, password } = req.body;
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
  let userExists = await User.findOne(query);
  let credMatch;
  if (userExists) {
    credMatch = await comparePassword(password, userExists.password);
  }
  if (userExists && credMatch) {
    /**user found delete sensitive data before generating token*/
    let _loginResponse = userExists.toObject();
    delete _loginResponse._id;
    delete _loginResponse.__v;
    delete _loginResponse.password;

    /**generate token */
    await generateToken(_loginResponse, (error, token) => {
      if (error) {
        res
          .status(500)
          .json(formatResponse(true, 500, "Internal Server Error", error));
      } else {
        res.header("authToken", token.authToken);
        res.status(200).json(
          formatResponse(false, 200, "User Authenticated", {
            ..._loginResponse,
            ...token,
          })
        );
      }
    });
  } else if (!userExists) {
    res.status(404).json(formatResponse(true, 400, "User Not Found", null));
  } else if (!credMatch) {
    res.status(404).json(formatResponse(true, 400, "Login Failed", null));
  }
};
