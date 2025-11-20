const asyncHandler = require("express-async-handler");
const Payment = require("../models/paymentModel");
const { response } = require("express");

// --------------------------------------------------------------------
//  N E W   P A Y M E N T
// --------------------------------------------------------------------
const newPayment = asyncHandler(async (req, res) => {
  const { paymentDate, amount, paymentMethod, reservationID } = req.body;

  console.log("NEW PAYMENT CONTROLLER");
  console.log("reservationID", reservationID);
  console.log("paymentDate", paymentDate);
  console.log("paymentMethod", paymentMethod);
  console.log("amount", amount);

  // validation
  if (!paymentDate || !amount || !paymentMethod || !reservationID) {
    res.status(400);
    throw new Error("Please fill all Required Fields");
  }

  // create new payment
  const payment = await Payment.create({
    paymentDate,
    amount,
    paymentMethod,
    reservationID,
  });

  if (payment) {
    const { _id, paymentDate, amount, paymentMethod, reservationID } = payment;
    res.status(201).json({
      _id,
      paymentDate,
      amount,
      paymentMethod,
      reservationID,
    });
  } else {
    response.status(400);
    throw new Error("Invalid payment data");
  }
});

// --------------------------------------------------------------------
//  G E T A L L   P A Y M E N T S
// --------------------------------------------------------------------
const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find().populate({
    path: "reservationID",
    populate: [
      {
        path: "tripID",
        model: "Trip",
      },
      {
        path: "userID",
        model: "User",
      },
    ],
  });
  res.status(200).json(payments);
});

// --------------------------------------------------------------------
//  G E T  S I N G L E   P A Y M E N T
// --------------------------------------------------------------------
const getPayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) {
    response.status(400);
    throw new Error("Invalid payment");
  }
  res.status(200).json(payment);
});

// --------------------------------------------------------------------
//  U P D A T E   P A Y M E N T
// --------------------------------------------------------------------
const updatePayment = asyncHandler(async (req, res) => {
  const { paymentDate, amount, paymentMethod, reservationID } = req.body;

  const payment = await Payment.findById(req.params.id);

  if (!payment) {
    response.status(400);
    throw new Error("Invalid payment");
  } else {
    console.log("Payment:", payment);
  }
  // update payment
  const updatedPayment = await Payment.findByIdAndUpdate(
    { _id: req.params.id },
    {
      paymentDate,
      amount,
      paymentMethod,
      reservationID,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (updatedPayment) {
    res.status(201).json(updatedPayment);
  } else {
    response.status(400);
    throw new Error("Invalid payment data");
  }
});

// --------------------------------------------------------------------
//  D E L E T E    P A Y M E N T
// --------------------------------------------------------------------
const deletePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findByIdAndDelete(req.params.id);
  if (!payment) {
    response.status(400);
    throw new Error("Invalid payment");
  }
  res.status(200).json(payment);
});

module.exports = {
  newPayment,
  getPayments,
  deletePayment,
  updatePayment,
  getPayment,
};
