const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
//here protect is a middleware that will be executed before the get request allUsers
router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.route("/login").post(authUser);

module.exports = router;
