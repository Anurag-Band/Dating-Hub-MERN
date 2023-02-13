const express = require("express");
const {
  loginUser,
  signupUser,
  logoutUser,
  getLoggedInUserDetails,
  allUser,
  superLikeUser,
  likeUser,
  blockUser,
  getUserDetails,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/auth");
const { upload } = require("../utils/awsFunctions");

const router = express();

router.route("/signup").post(upload.single("profilePic"), signupUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

router.route("/me").get(isAuthenticated, getLoggedInUserDetails);

// -----------

router.route("/users/all").get(isAuthenticated, allUser);

router.route("/user/detail/:id").get(isAuthenticated, getUserDetails);

router.route("/user/like/:id").put(isAuthenticated, likeUser);

router.route("/user/super-like/:id").put(isAuthenticated, superLikeUser);

router.route("/user/block/:id").put(isAuthenticated, blockUser);

module.exports = router;
