const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // For parsing multipart/form-data
const {
  newReview,
  getReviews,
  getReview,
  deleteReview,
  updateReview,
} = require("../controllers/userReviewsController");

router.post("/new", newReview);
router.get("/", getReviews);
router.get("/:id", getReview);
router.delete("/:id", deleteReview);
router.patch("/:id", upload.none(), updateReview);

module.exports = router;
