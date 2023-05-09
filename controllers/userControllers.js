const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../models/userModel");

// const userModel = require("../models/userModel");
//here we are sending data using queries in the URL.
//queries of a url starts with ? & can be accessed using req.query.query_name
//in the similar fashion as we used parameters which start with : in URL
//and can be accessed using req.params.parameter_name
//paramter is like a custom variable
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? //here i am using terenary operator ,if i get something in search query then
      {
        //using $or operator of mongodb that returns result of any one of conditions that's true
        $or: [
          //here I am using $regex of mongodb to search for the given string in name & email
          //$options i is used for case insensitivity.
          //Read Mongoose Docs for $or && $regex
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : //do nothing if my search query doesn't return anything
      {};

  //Apply the statements stored above on my database model & finding keyword(search query)
  // in my collection
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  //applying one more filter, will only return those results that are not equal to logged in user

  res.send(users);
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter All Fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    // return new Error("User Already exists");
    throw new Error("User Already exists");
  }

  const user = await User.create({ name, email, password, pic });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    // return new Error("Failed to Create User");
    throw new Error("Failed to Create User");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  console.log(email, password);
  console.log(user !== null);
  console.log(await user.matchPassword(password));

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
    console.log("Password Matched Successfully!");
  } else {
    console.log("ERROR");
    res.status(401);
    // return new Error("Invalid Email or Password");
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { registerUser, authUser, allUsers };
