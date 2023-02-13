const User = require("../models/userModel");
const catchAsync = require("../middlewares/catchAsync");
const sendCookie = require("../utils/sendCookie");
const ErrorHandler = require("../utils/errorHandler");

// Signup User
exports.signupUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (user) {
    if (user.username === username) {
      return next(new ErrorHandler("Username already exists", 401));
    }
    return next(new ErrorHandler("Email already exists", 401));
  }

  const newUser = await User.create({
    username,
    email,
    password,
    profilePic: req.file.location,
  });

  sendCookie(newUser, 201, res);
});

// Login User
exports.loginUser = catchAsync(async (req, res, next) => {
  const { userId, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: userId }, { username: userId }],
  }).select("+password");

  if (!user) {
    return next(new ErrorHandler("User doesn't exist", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Password doesn't match", 401));
  }

  sendCookie(user, 201, res);
});

// Logout User
exports.logoutUser = catchAsync(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Get User Details --Logged In User
exports.getLoggedInUserDetails = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Like or Unlike User
exports.likeUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  if (user.likes.includes(req.user._id)) {
    const index = user.likes.indexOf(req.user._id);

    user.likes.splice(index, 1);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile Unliked!",
      isLiked: false,
    });
  } else {
    user.likes.push(req.user._id);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile Liked!",
      isLiked: true,
    });
  }
});

// SuperLike or SuperUnlike User
exports.superLikeUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  if (user.superLikes.includes(req.user._id)) {
    const index = user.superLikes.indexOf(req.user._id);

    user.superLikes.splice(index, 1);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile Super Like Removed!",
      isSuperLiked: false,
    });
  } else {
    user.superLikes.push(req.user._id);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile Super Liked!",
      isSuperLiked: true,
    });
  }
});

// block or Unblock User
exports.blockUser = catchAsync(async (req, res, next) => {
  const otherUser = await User.findById(req.params.id);
  const currentUserId = req.user._id.toHexString();

  const currentUser = await User.findById(req.user._id);
  const otherUserId = otherUser._id.toHexString();

  if (!otherUser || !currentUser) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  // To know which user blocked current user ->>
  if (currentUser.blocked.includes(otherUserId)) {
    const index = currentUser.blocked.indexOf(otherUserId);

    currentUser.blocked.splice(index, 1);
    await currentUser.save();
  } else {
    currentUser.blocked.push(otherUserId);

    await currentUser.save();
  }

  // To get users blocked by this user ->>
  if (otherUser.blockedBy.includes(currentUserId)) {
    const index = otherUser.blockedBy.indexOf(currentUserId);

    otherUser.blockedBy.splice(index, 1);
    await otherUser.save();

    return res.status(200).json({
      success: true,
      message: "Profile Unblocked",
      isBlocked: false,
    });
  } else {
    otherUser.blockedBy.push(currentUserId);
    await otherUser.save();

    return res.status(200).json({
      success: true,
      message: "Profile Blocked",
      isBlocked: true,
    });
  }
});

// Get User Details
exports.getUserDetails = catchAsync(async (req, res, next) => {
  const userDetails = await User.findById(req.params.id);

  if (!userDetails) {
    return next(new ErrorHandler("User Not Found", 404));
  }

  res.status(200).json({
    success: true,
    userDetails,
  });
});

// Get All Profiles
exports.allUser = catchAsync(async (req, res, next) => {
  const currentUser = req.user._id.toHexString();

  const users = await User.find();

  const filteredProfiles = [];

  users.forEach((prof, index) => {
    const ids = prof.blocked.map((id) => id.toHexString());

    if (prof._id.toHexString() === req.user._id.toHexString()) {
      users.splice(index, 1);
      return;
    }

    if (ids.includes(currentUser)) {
      users.splice(index, 1);
    } else {
      filteredProfiles.push(prof);
    }
  });

  return res.status(200).json({
    users,
  });
});
