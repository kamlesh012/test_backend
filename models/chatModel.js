const mongoose = require("mongoose");
const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        //ref should be set to the name of model.

        ref: "User", //originally this & was set working as well

        // ref: "userModel", //suggested to set this same to Model Name.
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //commented in tutorisal
      // ref: "userModel",
    },
  },
  { timestamps: true }
);

const Chat = new mongoose.model("Chat", chatModel);

//object can be created like this const first = new chat({});

module.exports = Chat;
