const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  deleteUser,
  getUsers,
  loginStatus,
  updateUser,
  updateType,
  changePassword,
  forgotPassword,
} = require("../controllers/userController"); // ctrl + spacebar
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getuser/:id", getUser);
router.get("/", getUsers);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", protect, updateUser);
router.patch("/changepass", protect, changePassword);
router.post("/forgotpassword", forgotPassword);
router.delete("/:id", deleteUser);
router.patch("/:id/type", updateType);

module.exports = router;
