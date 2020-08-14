const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

/**configure envoirnment variables */
dotenv.config();
/**init express app */
const app = express();
/**add middlewares */
app.use(bodyParser.json);
app.use(cors);

/**listen to server */
let port = process.env.PORT;

app.listen(port, () => console.log("API Server Running at::", port));
