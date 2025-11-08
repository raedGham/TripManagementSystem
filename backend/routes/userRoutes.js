const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getUsers,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
} = require("../controllers/userController"); // ctrl + spacebar
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getuser", getUser);
router.get("/", getUsers);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", protect, updateUser);
router.patch("/changeAdminPass", protect, changePassword);
router.post("/forgotpassword", forgotPassword);

module.exports = router;
