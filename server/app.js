const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const httpLogger = require("./middlewares/httpLogger");
const logger = require("./library/logger");
const { initdb } = require("./initdb");
const router = require("./router/router");

/**configure envoirnment variables */
dotenv.config();

/**init express app */
const app = express();

/**add middlewares */
app.use(httpLogger);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**init db */
initdb();

/**add router */
app.use(process.env.API_VERSION, router);

/**listen to server */
let port = process.env.PORT;

app.listen(port, () => logger.info(`API Server Running at:${port}`));
