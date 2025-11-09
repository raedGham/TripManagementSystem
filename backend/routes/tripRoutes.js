const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // For parsing multipart/form-data
const uploadTripImages = require("../middlewares/uploadTripImages");
const {
  newTrip,
  getTrips,
  getTrip,
  deleteTrip,
  updateTrip,
  uploadImageCont,
  deleteImage,
} = require("../controllers/tripController");

router.post("/new", upload.none(), newTrip);
router.get("/", getTrips);
router.get("/:id", getTrip);
router.delete("/:id", deleteTrip);
router.patch("/:id", upload.none(), updateTrip);

module.exports = router;
