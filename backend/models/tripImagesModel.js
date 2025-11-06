const mongoose = require("mongoose");

const tripImagesSchema = mongoose.Schema(
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
    
  },
  { timestamps: true }
);

const TripImages = mongoose.model("TripImages", tripImagesSchema);
module.exports = TripImages;
