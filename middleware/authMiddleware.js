const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
//protect is a middleware that authorizes the current logged in user

const protect = asyncHandler(async (req, res, next) => {
  //in request headers we will send tokens of authorization that starts with Bearer followed by
  //hashed string
  let token;
  if (
    //if the headers matches our description as above
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //remove the "Bearer" string from start of authorization string

      token = req.headers.authorization.split(" ")[1];
      // token = req.headers.authorization;
      // console.log(token);
      //then verify if the hashed key recieved is same as our JWT Secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded, decoded.id);
      //if yes then find the user that has this hashed key
      //& return all details of that user except the password
      req.user = await User.findById(decoded.id).select("-password");
      //move to next middleware or next part of the query
      next();
    } catch (error) {
      res.status(401);
      // return new Error("Not authorized, token failed");
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    // return new Error("Not authorized, no token");
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
