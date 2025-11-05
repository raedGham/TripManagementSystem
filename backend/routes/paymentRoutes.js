const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // For parsing multipart/form-data
const {
  newPayment,
  getPayments,
  getPayment,
  deletePayment,
  updatePayment,
} = require("../controllers/paymentController");

router.post("/new", newPayment);
router.get("/", getPayments);
router.get("/:id", getPayment);
router.delete("/:id", deletePayment);
router.patch("/:id", upload.none(), updatePayment);

module.exports = router;
