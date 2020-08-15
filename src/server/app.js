const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const httpLogger = require("./middlewares/httpLogger");
const logger = require("./library/logger");
const { initdb } = require("./initdb");
const router = require("./router/router");
const { notfound, handleError } = require("./middlewares/errorHandlers");
const helmet = require("helmet");

/**configure envoirnment variables */
dotenv.config();

/**init express app */
const app = express();

/**add middlewares */
app.use(httpLogger);
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authToken, access-control-allow-origin"
  );
  next();
});
/**init db */
initdb();

/**add router */
app.use(process.env.API_VERSION, router);
app.use(notfound);
app.use(handleError);
/**listen to server */
let port = process.env.NODE_ENV === "production" ? "" : process.env.PORT;

app.listen(port, () => logger.info(`API Server Running at:${port}`));
