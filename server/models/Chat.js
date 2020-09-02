const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  chatId: {
    type: String,
    unique: true,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  recieverId: {
    type: String,
    required: true,
  },
  recieverName: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  modifiedAt: {
    type: Date,
    default: Date.now(),
  },
  seen: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Chat", chatSchema);
