const asyncHandler = require("express-async-handler");
const Review = require("../models/userReviewsModel");

exports.createReview = asyncHandler(async (req, res) => {
  try {
    const { tripID, rating, comment, userID } = req.body;
    console.log(tripID);
    console.log(rating);
    console.log(comment);
    console.log(userID);
    if (!tripID || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const review = await Review.create({
      tripID,
      userID,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

exports.getReviewsByTrip = asyncHandler(async (req, res) => {
  try {
    const reviews = await Review.find({ tripID: req.params.tripID }).populate(
      "userID",
      "name email"
    );

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
