const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const httpLogger = require("./middlewares/httpLogger");
const logger = require("./library/logger");
const { initdb } = require("./initdb");
const router = require("./router/router");
const { notfound, handleError } = require("./middlewares/errorHandlers");
const { socketServer } = require("./library/socketControl");
//const helmet = require("helmet");
const path = require("path");
const methodOverride = require("method-override");

/**configure envoirnment variables */
dotenv.config();

let port = process.env.PORT || process.env.API_PORT;

/**init express app */
const app = express();

/**add middlewares */
app.use(httpLogger);
app.use(cors());
app.use(methodOverride("_method"));

//app.use(helmet());
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

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../client/build")));

// All remaining requests return the React app, so it can handle routing.
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.use(notfound);
app.use(handleError);

/**listen to server */
let server = app.listen(port, () =>
  logger.info(`API Server Running at:${port}`)
);
//attach socket to the sever
let socketInit = socketServer(server);
console.log("socketInit", socketInit);
