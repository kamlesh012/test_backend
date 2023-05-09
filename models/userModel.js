const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(
    enteredPassword,
    this.password
    //removed a callback which was added by self,didnot notice when it was added.
    //but it was giving a problem
  );
};

//need to delve deep
userSchema.pre("save", async function (next) {
  if (!this.isModified) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//changed this did not fix error till now
// const User = new mongoose.model("userModel", userSchema);
const User = new mongoose.model("User", userSchema);

module.exports = User;
