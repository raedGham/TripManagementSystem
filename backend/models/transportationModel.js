const mongoose = require("mongoose");

const transportationSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["car", "fairy", "train"],
      required: [true, "Please enter trip title"],
    },

    arrivalLocation: {
      type: String,
      required: [true, "Please enter Arrival Location"],
    },

    departureLocation: {
      type: String,
      required: [true, "Please enter Departure Location"],
    },

    arrivalDate: {
      type: Date,
      required: [true, "Please enter arrival date"],
    },

    depatureDate: {
      type: Date,
      required: [true, "Please enter departure date"],
    },

    duration: {
      type: Number,
      default: 1,
    },

    costPerTrip: {
      type: Number,
      required: [true, "Please enter cost Per Trip"],
    },


    tripID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
  },
  { timestamps: true }
);

const Transportation = mongoose.model("Transportation", transportationSchema);
module.exports = Transportation;
