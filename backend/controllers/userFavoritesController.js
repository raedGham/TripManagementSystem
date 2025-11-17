const asyncHandler = require("express-async-handler");
const Favorite = require("../models/userFavoritesModel");
const { response } = require("express");

// --------------------------------------------------------------------
//  N E W   F A V O R I T E
// --------------------------------------------------------------------
const newFavorite = asyncHandler(async (req, res) => {
  const { tripID, userID, rating } = req.body;

  // create new favorite
  const favorite = await Favorite.create({
    tripID,
    userID,
    rating,
  });

  if (favorite) {
    const { _id, tripID, userID, rating } = favorite;

    res.status(201).json({
      _id,
      tripID,
      userID,
      rating,
    });
  } else {
    response.status(400);
    throw new Error("Invalid favorite data");
  }
});

// --------------------------------------------------------------------
//  G E T A L L   F A V O R I T E S
// --------------------------------------------------------------------
const getFavorites = asyncHandler(async (req, res) => {
  const favorites = await Favorite.find();
  res.status(200).json(favorites);
});

// --------------------------------------------------------------------
//  G E T  S I N G L E   F A V O R I T E
// --------------------------------------------------------------------
const getFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.findById(req.params.id);
  if (!favorite) {
    response.status(400);
    throw new Error("Invalid favorite");
  }
  res.status(200).json(favorite);
});

// --------------------------------------------------------------------
//  U P D A T E   F A V O R I T E
// --------------------------------------------------------------------
const updateFavorite = asyncHandler(async (req, res) => {
  const { tripID, userID } = req.body;

  const favorite = await Favorite.findById(req.params.id);

  if (!favorite) {
    response.status(400);
    throw new Error("Invalid favorite");
  } else {
    console.log("Favorite:", favorite);
  }
  // update favorite
  const updatedFavorite = await Favorite.findByIdAndUpdate(
    { _id: req.params.id },
    {
      tripID,
      userID,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (updatedFavorite) {
    res.status(201).json(updatedFavorite);
  } else {
    response.status(400);
    throw new Error("Invalid favorite data");
  }
});

// --------------------------------------------------------------------
//  D E L E T E    F A V O R I T E
// --------------------------------------------------------------------
const deleteFavorite = asyncHandler(async (req, res) => {
  const favorite = await Favorite.findByIdAndDelete(req.params.id);
  if (!favorite) {
    response.status(400);
    throw new Error("Invalid favorite");
  }
  res.status(200).json(favorite);
});

// --------------------------------------------------------------------
//  RATE TRIP
// --------------------------------------------------------------------
const rateTrip = asyncHandler(async (req, res) => {
  const { tripID, userID, rating } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    res.status(400);
    throw new Error("Rating must be between 1 and 5");
  }

  // Find existing favorite
  let favorite = await Favorite.findOne({ tripID, userID });

  if (favorite) {
    favorite.rating = rating;
    await favorite.save();
  } else {
    favorite = await Favorite.create({ tripID, userID, rating });
  }

  res.status(200).json(favorite);
});

module.exports = {
  newFavorite,
  getFavorites,
  deleteFavorite,
  updateFavorite,
  getFavorite,
  rateTrip,
};
