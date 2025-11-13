const asyncHandler = require("express-async-handler");
const Trip = require("../models/tripModel");
const TripImage = require("../models/tripImagesModel");
const { response } = require("express");
const path = require("path");
const fs = require("fs");

// --------------------------------------------------------------------
//  N E W   T R I P
// --------------------------------------------------------------------
const newTrip = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {
    title,
    destination,
    demographic,
    startDate,
    endDate,
    pricePerPerson,
    organizerID,
    thumbnail,
  } = req.body;

  // validation
  if (!title || !destination || !demographic || !startDate || !endDate) {
    res.status(400);
    throw new Error("Please fill all Required Fields");
  }

  // create new trip
  const trip = await Trip.create({
    title,
    destination,
    demographic,
    startDate,
    endDate,
    pricePerPerson,
    organizerID,
    thumbnail: path.join("uploads", "thumbs", req.file.filename),
  });

  if (trip) {
    const {
      _id,
      title,
      destination,
      demographic,
      startDate,
      endDate,
      pricePerPerson,
      organizerID,
      thumbnail,
    } = trip;
    res.status(201).json({
      _id,
      title,
      destination,
      demographic,
      startDate,
      endDate,
      pricePerPerson,
      organizerID,
      thumbnail,
    });
  } else {
    response.status(400);
    throw new Error("Invalid trip data");
  }
});

// --------------------------------------------------------------------
//  G E T A L L   T R I P S
// --------------------------------------------------------------------
const getTrips = asyncHandler(async (req, res) => {
  const trips = await Trip.find().sort("startDate").populate("organizerID");
  res.status(200).json(trips);
});

// --------------------------------------------------------------------
//  G E T  S I N G L E   T R I P
// --------------------------------------------------------------------
const getTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id).populate("organizerID");
  if (!trip) {
    response.status(400);
    throw new Error("Invalid trip");
  }
  res.status(200).json(trip);
});

// --------------------------------------------------------------------
//  U P D A T E   T R I P
// --------------------------------------------------------------------
const updateTrip = asyncHandler(async (req, res) => {
  const {
    title,
    destination,
    demographic,
    startDate,
    endDate,
    pricePerPerson,
    organizerID,
  } = req.body;

  const trip = await Trip.findById(req.params.id);

  if (!trip) {
    response.status(400);
    throw new Error("Invalid trip");
  } else {
    console.log("Trip:", trip);
  }
  // update trip
  const updatedTrip = await Trip.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title,
      destination,
      demographic,
      startDate,
      endDate,
      pricePerPerson,
      organizerID,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (updatedTrip) {
    res.status(201).json(updatedTrip);
  } else {
    response.status(400);
    throw new Error("Invalid trip data");
  }
});

// --------------------------------------------------------------------
//  D E L E T E    T R I P
// --------------------------------------------------------------------
const deleteTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findByIdAndDelete(req.params.id);
  if (!trip) {
    response.status(400);
    throw new Error("Invalid trip");
  }
  res.status(200).json(trip);
});

// --------------------------------------------------------------------
//  A D D  I M A G E S
// --------------------------------------------------------------------

const addImages = asyncHandler(async (req, res) => {
  console.log("ADD IMAGES CONTROLLER");
  try {
    const tripId = req.params.id;
    // ensure trip exists
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const records = req.files.map((f) => ({
      tripID: tripId,
      path: path.join("uploads", path.basename(f.path)), // store relative path
      originalName: f.originalname,
      mimeType: f.mimetype,
      size: f.size,
    }));

    const saved = await TripImage.insertMany(records);

    res.status(201).json({ message: "Images uploaded", images: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

// --------------------------------------------------------------------
//  G E T  I M A G E S
// --------------------------------------------------------------------
const getImages = asyncHandler(async (req, res) => {
  try {
    console.log("GetImages controller:", req.params.id);
    const images = await TripImage.find({ tripID: req.params.id }).sort({
      createdAt: -1,
    });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --------------------------------------------------------------------
//  D E L E T E   I M A G E
// --------------------------------------------------------------------
const delImage = asyncHandler(async (req, res) => {
  try {
    const { tripId, imageId } = req.params;
    const img = await TripImage.findOne({ _id: imageId, tripID: tripId });
    if (!img) return res.status(404).json({ message: "Image not found" });

    // remove file
    const filePath = path.join(__dirname, "..", img.path);
    fs.unlink(filePath, (err) => {
      if (err) console.warn("Could not delete file:", err.message);
    });

    await img.deleteOne();
    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  newTrip,
  getTrips,
  deleteTrip,
  updateTrip,
  getTrip,
  addImages,
  getImages,
  delImage,
};
