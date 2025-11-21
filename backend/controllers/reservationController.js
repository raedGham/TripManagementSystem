const asyncHandler = require("express-async-handler");
const Reservation = require("../models/reservationModel");
const { response } = require("express");

// --------------------------------------------------------------------
//  N E W   R E S E R V A T I O N
// --------------------------------------------------------------------
const newReservation = asyncHandler(async (req, res) => {
  const { reservationDate, numberOfPeople, status, tripID, userID } = req.body;

  // validation
  if (!numberOfPeople || !status) {
    res.status(400);
    throw new Error("Please fill all Required Fields");
  }

  // create new reservation
  const reservation = await Reservation.create({
    reservationDate,
    numberOfPeople,
    status,
    tripID,
    userID,
  });

  if (reservation) {
    const { _id, numberOfPeople, status, tripID, userID } = reservation;

    res.status(201).json({
      _id,
      reservationDate,
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
  const reservations = await Reservation.find()
    .populate("tripID")
    .populate("userID");

  res.status(200).json(reservations);
});

// --------------------------------------------------------------------
//  G E T  S I N G L E   R E S E R V A T I O N
// --------------------------------------------------------------------
const getReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id).populate(
    "tripID"
  );
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
  const { reservationDate, numberOfPeople, status, tripID, userID } = req.body;

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
      reservationDate,
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

// --------------------------------------------------------------------
//  U P D A T E    R E S E R V A T I O N  S T A T U S
// --------------------------------------------------------------------

const updateResStatus = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Reservation.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Reservation not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  newReservation,
  getReservations,
  deleteReservation,
  updateReservation,
  getReservation,
  updateResStatus,
};
