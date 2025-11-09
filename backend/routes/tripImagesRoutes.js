// routes/tripImagesRoute.js
const router = require("express").Router();
const uploadTripImages = require("../middlewares/uploadTripImages");
const TripImages = require("../models/tripImagesModel");

router.post(
  "/add/:tripID",
  uploadTripImages.array("images", 10),
  async (req, res) => {
    try {
      const { tripID } = req.params;

      const createdImages = await Promise.all(
        req.files.map((file) =>
          TripImages.create({
            tripID,
            path: "/uploads/tripImages/" + file.filename, // store path in DB
          })
        )
      );

      res.json(createdImages);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.get("/:tripID", async (req, res) => {
  const images = await TripImages.find({ tripID: req.params.tripID });
  res.json(images);
});

module.exports = router;
