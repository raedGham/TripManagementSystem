const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // For parsing multipart/form-data
const {
  newAccomodation,
  getAccomodations,
  getAccomodation,
  deleteAccomodation,
  updateAccomodation,
} = require("../controllers/accomodationController");

router.post("/new", newAccomodation);
router.get("/", getAccomodations);
router.get("/:id", getAccomodation);
router.delete("/:id", deleteAccomodation);
router.patch("/:id", upload.none(), updateAccomodation);

module.exports = router;
