const express = require("express");
const router = express.Router();
const multer = require("multer");
const protect = require("../middleware/authMiddleware");
const upload = multer(); // For parsing multipart/form-data
const {
  newPayment,
  getPayments,
  getPayment,
  deletePayment,
  updatePayment,
} = require("../controllers/paymentController");

router.post("/new", protect, upload.none(), newPayment);
router.get("/", getPayments);
router.get("/:id", getPayment);
router.delete("/:id", protect, deletePayment);
router.patch("/:id", protect, upload.none(), updatePayment);

module.exports = router;
