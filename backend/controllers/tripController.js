const asyncHandler = require("express-async-handler");
const Trip = require("../models/tripModel");
const { response } = require("express");

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

module.exports = {
  newTrip,
  getTrips,
  deleteTrip,
  updateTrip,
  getTrip,
};
