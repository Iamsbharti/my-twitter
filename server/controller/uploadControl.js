const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const GridFsStorage = require("multer-gridfs-storage");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const crypto = require("crypto");
const User = require("../models/User");
const EXCLUDE = "-__v -_id -password";
const { formatResponse } = require("../library/formatResponse");
const logger = require("../library/logger");
const mongoURI = process.env.DB_CONNECT;
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(mongoURI.toString());

/**init db connection */
const connection = mongoose.connection;
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
    cb(formatResponse(true, 500, "File Extension Not Allowed", null), false);
  }
};
const fetchPictures = (req, res) => {
  logger.info(`Fetch Pictures${req.query.filename}`);
  gfs.files.findOne({ filename: req.query.filename }, (error, file) => {
    /**file existence */
    if (!file || file.length === 0) {
      return res
        .status(404)
        .json(formatResponse(true, 404, "File Not Found", ""));
    }
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  });
};
const fetchPicturesForUserId = async (req, res) => {
  logger.info(`Fetch Pictures for ${req.query.userId}`);
  /**find file name of users*/
  const getFileName = async () => {
    let userDetails = await User.findOne({ userId: req.query.userId })
      .select(EXCLUDE)
      .populate("profile");

    let { profile } = userDetails;
    console.log("user-profile::", profile);
    const filename = profile.filename;
    return { filename: filename };
  };

  gfs.files.findOne(getFileName(), (error, file) => {
    if (!file || file.length === 0) {
      return res
        .status(404)
        .json(formatResponse(true, 404, "File Not Found", ""));
    }
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  });
};
module.exports = {
  storage,
  fileFilter,
  fetchPictures,
  fetchPicturesForUserId,
};
