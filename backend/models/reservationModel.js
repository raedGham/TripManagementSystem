const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema(
  {
    numberOfPeople: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      enum: ["active", "cancelled", "confirmed", "completed"],
      required: [true, "Please select Status"],
    },     
    
    tripID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },

    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
