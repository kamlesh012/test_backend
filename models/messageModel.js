const mongoose = require("mongoose");
const messageModel = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: {
      type: String,
      trim: true,
    },
    // Original.Capital Chat. wrong.not working
    // Chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },

    // Working on Postman
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamp: true }
);

const Message = new mongoose.model("Message", messageModel);

module.exports = Message;
