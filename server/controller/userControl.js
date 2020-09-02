const User = require("../models/User");
//const Post = require("../models/Post");
const { formatResponse } = require("../library/formatResponse");
const logger = require("../library/logger");
const Chat = require("../models/Chat");
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
  const { followers } = updates;
  console.log("followers::", followers);
  /**validate userid */
  let userFound = await verifyUserId(userId);
  if (userFound.error) {
    logger.error("User Not Found");
    return res.status(404).json(userFound);
  }
  /**update followers array*/
  let finalUpdateQuery = updates;
  if (followers) {
    console.log("updating follower query");
    delete finalUpdateQuery.followers;
    let [followerId, action] = followers.split(":");
    /**increment the follower's ;;following number by one */
    let followerQuery = { userId: followerId };
    let followerProfile = await User.findOne(followerQuery);
    console.log("folower following's val::", followerProfile.following);
    if (action === "follow") {
      finalUpdateQuery = {
        ...finalUpdateQuery,
        $push: { followers: followerId },
      };
      let updatesFollowers = await User.updateOne(followerQuery, {
        following: followerProfile.following + 1,
      });
      logger.info(`${updatesFollowers.n} - follower incremented`);
    } else {
      finalUpdateQuery = {
        ...finalUpdateQuery,
        $pull: { followers: followerId },
      };
      let updatesFollowers = await User.updateOne(followerQuery, {
        following: followerProfile.following - 1,
      });
      logger.info(`${updatesFollowers.n} - follower decremented`);
    }
  }

  console.log("follower query::", finalUpdateQuery);
  /**update the current found user */
  let query = { userId: userId };
  User.updateOne(query, finalUpdateQuery, (error, userUpdated) => {
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
const getChatsBetweenUsers = async (req, res) => {
  logger.info("Get chat control");
  const { senderId, recieverId } = req.query;
  let findChatQuery = {
    $or: [
      {
        $and: [{ senderId: senderId }, { recieverId: recieverId }],
      },
      {
        $and: [{ recieverId: senderId }, { senderId: recieverId }],
      },
    ],
  };
  Chat.find(findChatQuery)
    .select("-_id -__v")
    .sort("-createdOn")
    .lean()
    .limit(10)
    .exec((error, foundChat) => {
      if (error) {
        res
          .status(500)
          .json(formatResponse(true, 500, "Internal Server Error", error));
      } else {
        res
          .status(200)
          .json(formatResponse(false, 200, "Chat Fetched", foundChat));
      }
    });
};
module.exports = {
  getUserInfo,
  updateUserInfo,
  getUserList,
  getChatsBetweenUsers,
};
