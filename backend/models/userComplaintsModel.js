const mongoose = require("mongoose");

const complaintSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    supervisorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    category: {
      type: String,
      required: [true, "Please enter category"],
    },

    status: {
      type: String,
      required: [true, "Please enter status"],
    },
    complaintText: {
      type: String,
      required: [true, "What is your complaint..."],
    },
    dateFiled: {
      type: Date,
      default: Date.now,
    },

    dateReviewed: {
      type: Date,
      default: Date.now,
    },

    responseText: {
      type: String,
      required: [false, "Please enter response"],
    },
  },
  { timestamps: true }
);

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;
