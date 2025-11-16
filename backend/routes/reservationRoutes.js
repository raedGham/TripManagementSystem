const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // For parsing multipart/form-data
const {
  newReservation,
  getReservations,
  getReservation,
  deleteReservation,
  updateReservation,
} = require("../controllers/reservationController");

router.post("/new", upload.none(), newReservation);
router.get("/", getReservations);
router.get("/:id", getReservation);
router.delete("/:id", deleteReservation);
router.patch("/:id", upload.none(), updateReservation);

module.exports = router;
