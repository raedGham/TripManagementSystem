const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Token = require("../models/tokenModel");
//const sendEmail = require('../utils/sendEmail')

// Function to generate a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// --------------------------------------------------------------------
// R E G I S T E R   U S E R
// --------------------------------------------------------------------
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, type, password } = req.body;

  // validation
  if (!name || !email || !password || !type) {
    res.status(400);
    throw new Error("Please fill all Required Fields");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be min 6 characters");
  }

  // check if email exists in the database

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("Email already exists ");
  }

  // create new user
  const user = await User.create({
    name,
    email,
    type,
    password,
  });
  // Generate Token
  const token = generateToken(user._id);

  // send HTTP-only cookie to the frontend
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { _id, name, email, type } = user;
    res.status(201).json({
      _id,
      name,
      email,
      type,
      token,
    });
  } else {
    response.status(400);
    throw new Error("Invalid user data");
  }
});

// --------------------------------------------------------------------
// L O G I N   U S E R
// --------------------------------------------------------------------
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // validate request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add Email & password");
  }

  // check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found please sign up");
  }

  // user exists , check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (user && passwordIsCorrect) {
    // Generate Token
    const token = generateToken(user._id);
    console.log(token);
    // send HTTP-only cookie to the frontend
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "lax",
      secure: false,
    });

    const { _id, name, email, type } = user;
    res.status(200).json({ _id, name, email, type, token });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

// --------------------------------------------------------------------
// L O G O U T  U S E R
// --------------------------------------------------------------------
const logoutUser = asyncHandler(async (req, res) => {
  // send exiry info for the cookie in the frontend
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "sucessfully logged out" });
});

// --------------------------------------------------------------------
//   G E T   U S E R   I N F O
// --------------------------------------------------------------------
const getUser = asyncHandler(async (req, res) => {
  const user = User.findById(req.user._id);

  if (user) {
    const { _id, name, email, type } = user;
    res.status(200).json({
      _id,
      name,
      email,
      type,
    });
  } else {
    response.status(400);
    throw new Error("User not found");
  }
});

// --------------------------------------------------------------------
// L O G I N  S T A T U S
// --------------------------------------------------------------------
const loginStatus = asyncHandler(async (req, res) => {
  // get the token
  const token = req.cookies.token;
  console.log("token:", token);
  if (!token) {
    return res.json(false);
  }

  //verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }

  return res.json(false);
});

// --------------------------------------------------------------------
// U P D A T E   U S E R
// --------------------------------------------------------------------
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    user.email = email;
    user.name = req.body.name || name;
    user.type = req.body.type || type;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      type: updatedUser.type,
    });
  } else {
    response.status(404);
    throw new Error("User not found");
  }
});

// --------------------------------------------------------------------
// C H A N G E   P A S S W O R D
// --------------------------------------------------------------------
const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { oldPassword, password } = req.body;

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }

  // Validate
  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("Please Add old and new password");
  }
  // check if old password is correct (= pass in db)
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  // save new Password to database
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();
    res.status(200).send("Password changed sucessfully");
  } else {
    res.status(400);
    throw new Error("Old Password is incorrect");
  }
});

// --------------------------------------------------------------------
// F O R G O T   P A S S W O R D
// --------------------------------------------------------------------
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User does not exists");
  }

  // Create Reset Token
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id;

  // hash token before saving to db
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // save the hashedToken to database
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), //    30 minutes
  }).save();

  // Construct Reset URL  (the link that is sent with the reset Email)
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  // Reset Email

  const message = `
      <h2>Hello ${user.name} </h2>
      <p>You requested for a password reset</p>
      <p>Please use the url below to reset your password</p>
      <p>This reset link is valid only for 30 minutes.</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl} </a>
  `;
  const subject = "Password Reset Request";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ success: true, message: "Reset Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not Sent, please try again");
  }
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
};
