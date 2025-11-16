const asyncHandler = require("express-async-handler");
const Reservation = require("../models/reservationModel");
const { response } = require("express");

// --------------------------------------------------------------------
//  N E W   R E S E R V A T I O N
// --------------------------------------------------------------------
const newReservation = asyncHandler(async (req, res) => {
  const { numberOfPeople, status, tripID, userID } = req.body;

  // validation
  if (!numberOfPeople || !status) {
    res.status(400);
    throw new Error("Please fill all Required Fields");
  }

  // create new reservation
  const reservation = await Reservation.create({
    numberOfPeople,
    status,
    tripID,
    userID,
  });

  if (reservation) {
    const { _id, numberOfPeople, status, tripID, userID } = reservation;

    res.status(201).json({
      _id,
      numberOfPeople,
      status,
      tripID,
      userID,
    });
  } else {
    response.status(400);
    throw new Error("Invalid reservation data");
  }
});

// --------------------------------------------------------------------
//  G E T A L L   R E S E R V A T I O N S
// --------------------------------------------------------------------
const getReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find().sort("startDate");
  res.status(200).json(reservations);
});

// --------------------------------------------------------------------
//  G E T  S I N G L E   R E S E R V A T I O N
// --------------------------------------------------------------------
const getReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) {
    response.status(400);
    throw new Error("Invalid reservation");
  }
  res.status(200).json(reservation);
});

// --------------------------------------------------------------------
//  U P D A T E   R E S E R V A T I O N
// --------------------------------------------------------------------
const updateReservation = asyncHandler(async (req, res) => {
  const { numberOfPeople, status, tripID, userID } = req.body;

  const reservation = await Reservation.findById(req.params.id);

  if (!reservation) {
    response.status(400);
    throw new Error("Invalid reservation");
  } else {
    console.log("Reservation:", reservation);
  }
  // update reservation
  const updatedReservation = await Reservation.findByIdAndUpdate(
    { _id: req.params.id },
    {
      numberOfPeople,
      status,
      tripID,
      userID,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (updatedReservation) {
    res.status(201).json(updatedReservation);
  } else {
    response.status(400);
    throw new Error("Invalid reservation data");
  }
});

// --------------------------------------------------------------------
//  D E L E T E    R E S E R V A T I O N
// --------------------------------------------------------------------
const deleteReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findByIdAndDelete(req.params.id);
  if (!reservation) {
    response.status(400);
    throw new Error("Invalid reservation");
  }
  res.status(200).json(reservation);
});

module.exports = {
  newReservation,
  getReservations,
  deleteReservation,
  updateReservation,
  getReservation,
};
