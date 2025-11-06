const asyncHandler = require("express-async-handler");
const Activity = require("../models/activitiesModel");
const { response } = require("express");

// --------------------------------------------------------------------
//  N E W   A C T I V I T Y
// --------------------------------------------------------------------
const newActivity = asyncHandler(async (req, res) => {
  const {
    name, description,startDate, finishDate, capacity, tripID, costPerPerson,
  } = req.body;

  // validation
  if (!name || !description || !startDate || !finishDate || !capacity || !tripID || !costPerPerson) {
    res.status(400);
    throw new Error("Please fill all Required Fields");
  }

  // create new activity
  const activity = await Activity.create({
     name, description,startDate, finishDate, capacity, tripID, costPerPerson,
  });

  if (activity) {
    const {
      _id,name, description,startDate, finishDate, capacity, tripID, costPerPerson,
    } = activity;
    res.status(201).json({
      _id, name, description,startDate, finishDate, capacity, tripID, costPerPerson,
    });
  } else {
    response.status(400);
    throw new Error("Invalid activity data");
  }
});

// --------------------------------------------------------------------
//  G E T A L L   A C T I V I T Y S
// --------------------------------------------------------------------
const getActivities = asyncHandler(async (req, res) => {
  const activitys = await Activity.find().sort("startDate");
  res.status(200).json(activitys);
});

// --------------------------------------------------------------------
//  G E T  S I N G L E   A C T I V I T Y
// --------------------------------------------------------------------
const getActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id);
  if (!activity) {
    response.status(400);
    throw new Error("Invalid activity");
  }
  res.status(200).json(activity);
});

// --------------------------------------------------------------------
//  U P D A T E   A C T I V I T Y
// --------------------------------------------------------------------
const updateActivity = asyncHandler(async (req, res) => {
  const {
    name, description,startDate, finishDate, capacity, tripID, costPerPerson,
  } = req.body;

  const activity = await Activity.findById(req.params.id);

  if (!activity) {
    response.status(400);
    throw new Error("Invalid activity");
  } else {
    console.log("Activity:", activity);
  }
  // update activity
  const updatedActivity = await Activity.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name, description,startDate, finishDate, capacity, tripID, costPerPerson,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (updatedActivity) {
    res.status(201).json(updatedActivity);
  } else {
    response.status(400);
    throw new Error("Invalid activity data");
  }
});

// --------------------------------------------------------------------
//  D E L E T E    A C T I V I T Y
// --------------------------------------------------------------------
const deleteActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findByIdAndDelete(req.params.id);
  if (!activity) {
    response.status(400);
    throw new Error("Invalid activity");
  }
  res.status(200).json(activity);
});

module.exports = {
  newActivity,
  getActivities,
  deleteActivity,
  updateActivity,
  getActivity,
};
