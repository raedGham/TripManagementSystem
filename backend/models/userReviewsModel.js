const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
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
      type: String,
      required: [true, "Please enter rating"],
    },

    comment: {
      type: String,
      required: [true, "Please enter your comments"],
    },
  
    commentDate: {
      type: Date,
      default: Date.now,
    },   
  },
  { timestamps: true }
);

const Review = mongoose.model("Reviews", reviewSchema);
module.exports = Review;
