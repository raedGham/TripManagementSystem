const asyncHandler = require("express-async-handler");
const Transportation = require("../models/transportationModel");
const { response } = require("express");

// --------------------------------------------------------------------
//  N E W   T R A N S P O R T A T I O N
// --------------------------------------------------------------------
const newTransportation = asyncHandler(async (req, res) => {
  console.log("req.body:",req.body.departureDate)
  const {
    type,
    arrivalLocation,
    departureLocation,
    arrivalDate,
    departureDate,
    duration,
    costPerTrip,
    tripID,
  } = req.body;

  // validation
  if (
    !type ||
    !arrivalLocation ||
    !departureLocation ||
    !arrivalDate ||
    !departureDate ||
    !duration ||
    !costPerTrip
  ) {
    res.status(400);
    throw new Error("Please fill all Required Fields");
  }

  // create new transportation
  const transportation = await Transportation.create({
    type,
    arrivalLocation,
    departureLocation,
    arrivalDate,
    departureDate,
    duration,
    costPerTrip,
    tripID,
  });

  if (transportation) {
    const {
      _id,
      type,
      arrivalLocation,
      departureLocation,
      arrivalDate,
      departureDate,
      duration,
      costPerTrip,
      tripID,
    } = transportation;

    res.status(201).json({
      _id,
      type,
      arrivalLocation,
      departureLocation,
      arrivalDate,
      departureDate,
      duration,
      costPerTrip,
      tripID,
    });
  } else {
    response.status(400);
    throw new Error("Invalid transportation data");
  }
});

// --------------------------------------------------------------------
//  G E T A L L   T R A N S P O R T A T I O N S
// --------------------------------------------------------------------
const getTransportations = asyncHandler(async (req, res) => {
  const transportations = await Transportation.find().sort("startDate");
  console.log(transportations)
  res.status(200).json(transportations);
});

// --------------------------------------------------------------------
//  G E T  S I N G L E   T R A N S P O R T A T I O N
// --------------------------------------------------------------------
const getTransportation = asyncHandler(async (req, res) => {
  const transportation = await Transportation.findById(req.params.id);
  if (!transportation) {
    response.status(400);
    throw new Error("Invalid transportation");
  }
  res.status(200).json(transportation);
});

// --------------------------------------------------------------------
//  U P D A T E   T R A N S P O R T A T I O N
// --------------------------------------------------------------------
const updateTransportation = asyncHandler(async (req, res) => {
  const {
    type,
    arrivalLocation,
    departureLocation,
    arrivalDate,
    departureDate,
    duration,
    costPerTrip,
    tripID,
  } = req.body;

  const transportation = await Transportation.findById(req.params.id);

  if (!transportation) {
    response.status(400);
    throw new Error("Invalid transportation");
  } else {
    console.log("Transportation:", transportation);
  }
  // update transportation
  const updatedTransportation = await Transportation.findByIdAndUpdate(
    { _id: req.params.id },
    {
      type,
      arrivalLocation,
      departureLocation,
      arrivalDate,
      departureDate,
      duration,
      costPerTrip,
      tripID,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (updatedTransportation) {
    res.status(201).json(updatedTransportation);
  } else {
    response.status(400);
    throw new Error("Invalid transportation data");
  }
});

// --------------------------------------------------------------------
//  D E L E T E    T R A N S P O R T A T I O N
// --------------------------------------------------------------------
const deleteTransportation = asyncHandler(async (req, res) => {
  const transportation = await Transportation.findByIdAndDelete(req.params.id);
  if (!transportation) {
    response.status(400);
    throw new Error("Invalid transportation");
  }
  res.status(200).json(transportation);
});

module.exports = {
  newTransportation,
  getTransportations,
  deleteTransportation,
  updateTransportation,
  getTransportation,
};
