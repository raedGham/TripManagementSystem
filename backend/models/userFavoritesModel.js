const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema(
  {
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
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = Favorite;
