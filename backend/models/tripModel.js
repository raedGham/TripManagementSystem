const mongoose = require("mongoose");

const tripSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter trip title"],
    },

    destination: {
      type: String,
      required: [true, "Please enter trip destination"],
    },

    demographic: {
      type: String,
      required: [true, "Please enter trip demographic"],
    },

    startDate: {
      type: Date,
      required: [true, "Please enter trip start date"],
    },

    endDate: {
      type: Date,
      required: [true, "Please enter trip end date"],
    },

    pricePerPerson: {
      type: Number,
      default: 0,
    },

    organizerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
