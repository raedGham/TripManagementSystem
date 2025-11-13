const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadTripImages");
const uploadThumb = require("../middleware/uploadThumbnail");

const {
  newTrip,
  getTrips,
  getTrip,
  deleteTrip,
  updateTrip,
  addImages,
  getImages,
  delImage,
} = require("../controllers/tripController");

//image Routes

router.post("/images/:id", upload.array("images", 10), addImages);
router.get("/images/:id", getImages);
router.delete("/:tripId/images/:imageId", delImage);

router.post("/new", uploadThumb.single("thumbnail"), newTrip);
router.get("/", getTrips);
router.get("/:id", getTrip);
router.delete("/:id", deleteTrip);
router.patch("/:id", upload.none(), updateTrip);

module.exports = router;
