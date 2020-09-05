const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const GridFsStorage = require("multer-gridfs-storage");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const crypto = require("crypto");
const shortid = require("shortid");
const mongoURI = process.env.DB_CONNECT;
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(mongoURI.toString());
const connection = mongoose.connection;
/**init db connection */

/**init gfs */
let gfs;
connection.once("open", () => {
  //init gfs stream
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection("pictures");
});
/**create storage engine */
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      console.log("file::", file);
      crypto.randomBytes(16, (err, buffer) => {
        if (err) {
          return reject(err);
        }
        const fileName =
          buffer.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          fileName: fileName,
          bucketName: "pictures",
        };
        console.log("fileinfo::", fileInfo);
        resolve(fileInfo);
      });
    });
  },
});
/**file filter for incoming files */
const fileFilter = (req, file, cb) => {
  console.log("req::", file);
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("File Extension not allowed"), false);
  }
};

module.exports = {
  storage,
  fileFilter,
};
