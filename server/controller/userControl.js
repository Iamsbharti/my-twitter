const User = require("../models/User");
const Post = require("../models/Post");
const { formatResponse } = require("../library/formatResponse");
const logger = require("../library/logger");
const EXCLUDE = "-__v -_id -password";
const verifyUserId = async (userId) => {
  let userExists = await User.findOne({ userId: userId }).select(EXCLUDE);
  return userExists
    ? userExists
    : formatResponse(true, 404, "User Not Found", null);
};
const getUserInfo = async (req, res) => {
  logger.info("Get UserInfo Control");
  const { userId } = req.query;

  /**verify userId */
  let userFound = await verifyUserId(userId);
  /**not found */
  if (userFound.error) {
    logger.error("User Not Found");
    res.status(404).json(userFound);
  } else {
    /**user found return res */

    let userInfo = userFound.toObject();
    res.status(200).json(formatResponse(false, 200, "User Found", userInfo));
  }
};
const updateUserInfo = async (req, res) => {
  logger.info("Update userInfo control");
  const { userId, updates } = req.body;
  /**validate userid */
  let userFound = await verifyUserId(userId);
  if (userFound.error) {
    logger.error("User Not Found");
    return res.status(404).json(userFound);
  }
  /**update the current found user */
  let query = { userId: userId };
  User.updateOne(query, updates, (error, userUpdated) => {
    if (error) {
      res
        .status(500)
        .json(formatResponse(true, 500, "Internal Server Error", error));
    } else {
      let { n } = userUpdated;
      res
        .status(200)
        .json(formatResponse(false, 200, "User Updated", `${n} doc updated`));
    }
  });
};
const getUserList = async (req, res) => {
  logger.info("Get userList control");
  let users = await User.find().select(EXCLUDE);

  res.status(200).json(formatResponse(false, 200, "Users List", users));
};
module.exports = {
  getUserInfo,
  updateUserInfo,
  getUserList,
};
