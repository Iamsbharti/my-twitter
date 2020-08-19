const jwt = require("jsonwebtoken");
const logger = require("../library/logger");
const { formatResponse } = require("../library/formatResponse");

exports.isAuthorized = (req, res, next) => {
  logger.info(`Authorizing for ${req.originalUrl}`);
  const reqBodyAuth = req.body.authToken;
  const reqQueryAuth = req.query.authToken;
  const reqHeaderAuth = req.header("authToken");
  let reqBodyUserId = req.body.userId;
  let reqQueryUserId = req.query.userId;
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
    //console.log("Decoded::", decoded);
    let { userId } = decoded.data;
    let flagInvalidToken = false;
    //console.log(userId, reqQueryUserId, reqBodyUserId);
    if (reqBodyUserId !== undefined && userId !== reqBodyUserId) {
      console.log("not valid token");
      //throw new Error("Not Valid Token");
      flagInvalidToken = true;
    }
    if (reqQueryUserId !== undefined && userId !== reqQueryUserId) {
      console.log("not valid token");
      flagInvalidToken = true;
    }
    if (flagInvalidToken) {
      res.status(400);
      throw new Error(`Not Valid Token ${req.originalUrl}`);
    }
  } else {
    logger.error(`Auth Token Missing for ${req.originalUrl}`);
    return res
      .status(400)
      .json(formatResponse(true, 400, "Auth Token Missing", null));
  }
  logger.error(`Auth success for ${req.originalUrl}`);
  next();
};
