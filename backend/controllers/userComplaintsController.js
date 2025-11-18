const asyncHandler = require("express-async-handler");
const Complaint = require("../models/userComplaintsModel");
const { response } = require("express");

// --------------------------------------------------------------------
//  N E W   C O M P L A I N T
// --------------------------------------------------------------------
const newComplaint = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { userID, category, status, complaintText, dateFiled } = req.body;

  // validation
  if (!userID || !category || !status || !dateFiled || !complaintText) {
    res.status(400);
    throw new Error("Please fill all Required Fields");
  }

  // create new complaint
  const complaint = await Complaint.create({
    userID,
    category,
    status,
    complaintText,
    dateFiled,
  });

  if (complaint) {
    const { _id, userID, category, status, complaintText, dateFiled } =
      complaint;
    res.status(201).json({
      _id,
      userID,
      category,
      status,
      complaintText,
      dateFiled,
    });
  } else {
    response.status(400);
    throw new Error("Invalid complaint data");
  }
});

// --------------------------------------------------------------------
//  G E T A L L   C O M P L A I N T S
// --------------------------------------------------------------------
const getComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find();
  res.status(200).json(complaints);
});

// --------------------------------------------------------------------
//  G E T  S I N G L E   C O M P L A I N T
// --------------------------------------------------------------------
const getComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) {
    response.status(400);
    throw new Error("Invalid complaint");
  }
  res.status(200).json(complaint);
});

// --------------------------------------------------------------------
//  U P D A T E   C O M P L A I N T
// --------------------------------------------------------------------
const updateComplaint = asyncHandler(async (req, res) => {
  const {
    userID,
    supervisorID,
    category,
    status,
    dateFiled,
    dateReviewed,
    _response,
  } = req.body;

  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    response.status(400);
    throw new Error("Invalid complaint");
  } else {
    console.log("Complaint:", complaint);
  }
  // update complaint
  const updatedComplaint = await Complaint.findByIdAndUpdate(
    { _id: req.params.id },
    {
      userID,
      supervisorID,
      category,
      status,
      complaintText,
      dateFiled,
      dateReviewed,
      _response,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (updatedComplaint) {
    res.status(201).json(updatedComplaint);
  } else {
    response.status(400);
    throw new Error("Invalid complaint data");
  }
});

// --------------------------------------------------------------------
//  D E L E T E    C O M P L A I N T
// --------------------------------------------------------------------
const deleteComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findByIdAndDelete(req.params.id);
  if (!complaint) {
    response.status(400);
    throw new Error("Invalid complaint");
  }
  res.status(200).json(complaint);
});

module.exports = {
  newComplaint,
  getComplaints,
  deleteComplaint,
  updateComplaint,
  getComplaint,
};
