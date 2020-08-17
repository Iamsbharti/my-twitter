const jwt = require("jsonwebtoken");
const logger = require("../library/logger");
const { formatResponse } = require("../library/formatResponse");

exports.isAuthorized = (req, res, next) => {
  logger.info("Authorizing");
  const reqBodyAuth = req.body.authToken;
  const reqQueryAuth = req.query.authToken;
  const reqHeaderAuth = req.header("authToken");
  let reqUserId;
  /**check for valid authtoken */
  if (
    reqBodyAuth !== undefined ||
    reqQueryAuth !== undefined ||
    reqHeaderAuth !== undefined
  ) {
    /**verify the authtoken */
    let decoded = jwt.verify(
      reqBodyAuth || reqQueryAuth || reqHeaderAuth,
      process.env.TOKEN_SECRET
    );
    console.log("Decoded::", decoded);
    let { userId } = decoded.data;
    console.log("UserId::", req.query.userId);
    if (req.body.userId !== undefined) {
      reqUserId = req.body.userId;
    }
    if (req.query !== undefined) {
      reqUserId = req.query.userId;
    }
    console.log(userId, reqUserId);
    if (userId !== reqUserId) {
      throw new Error("Not Valid Token");
    }
  } else {
    logger.error("Auth Token Missing");
    return res
      .status(400)
      .json(formatResponse(true, 400, "Auth Token Missing", null));
  }
  next();
};
