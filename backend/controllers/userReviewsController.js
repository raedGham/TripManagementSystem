const asyncHandler = require("express-async-handler");
const Review = require("../models/userReviewsModel");
const { response } = require("express");

// --------------------------------------------------------------------
//  N E W   R E V I E W
// --------------------------------------------------------------------
const newReview = asyncHandler(async (req, res) => {
  const {
    tripID,
    userID,
    rating,
    comment,
  } = req.body;

  // validation
  if (!userID || !tripID || !rating ) {
    res.status(400);
    throw new Error("Please fill all Required Fields");
  }

  // create new review
  const review = await Review.create({
    tripID,
    userID,
    rating,
    comment,
  });

  if (review) {
    const {
      _id,
      tripID,
      userID,
      rating,
      comment,
    } = review;
    res.status(201).json({
      _id,
      tripID,
      userID,
      rating,
      comment,    });
  } else {
    response.status(400);
    throw new Error("Invalid review data");
  }
});

// --------------------------------------------------------------------
//  G E T A L L   R E V I E W S
// --------------------------------------------------------------------
const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find();
  res.status(200).json(reviews);
});

// --------------------------------------------------------------------
//  G E T  S I N G L E   R E V I E W
// --------------------------------------------------------------------
const getReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    response.status(400);
    throw new Error("Invalid review");
  }
  res.status(200).json(review);
});

// --------------------------------------------------------------------
//  U P D A T E   R E V I E W
// --------------------------------------------------------------------
const updateReview = asyncHandler(async (req, res) => {
  const {
    tripID,
    userID,
    rating,
    comment,
  } = req.body;

  const review = await Review.findById(req.params.id);

  if (!review) {
    response.status(400);
    throw new Error("Invalid review");
  } else {
    console.log("Review:", review);
  }
  // update review
  const updatedReview = await Review.findByIdAndUpdate(
    { _id: req.params.id },
    {
      tripID,
      userID,
      rating,
      comment,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (updatedReview) {
    res.status(201).json(updatedReview);
  } else {
    response.status(400);
    throw new Error("Invalid review data");
  }
});

// --------------------------------------------------------------------
//  D E L E T E    R E V I E W
// --------------------------------------------------------------------
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) {
    response.status(400);
    throw new Error("Invalid review");
  }
  res.status(200).json(review);
});

module.exports = {
  newReview,
  getReviews,
  deleteReview,
  updateReview,
  getReview,
};
