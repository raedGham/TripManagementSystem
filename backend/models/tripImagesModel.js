const mongoose = require("mongoose");

const tripImageSchema = mongoose.Schema(
  {
    tripID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },

    path: {
      type: String,
      required: [true, "Please enter image Path"],
    },    
    originalName: String,
    mimeType: String,
    size: Number
  },
  { timestamps: true }
);

const TripImage = mongoose.model("TripImage", tripImageSchema);
module.exports = TripImage;
