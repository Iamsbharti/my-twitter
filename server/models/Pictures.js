const mongoose = require("mongoose");

let GridfsSchema = mongoose.Schema({}, { strict: false });

module.exports = mongoose.model("Pictures", GridfsSchema, "pictures.files");
