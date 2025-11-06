const mongoose = require("mongoose");

const complaintSchema = mongoose.Schema(
  { 
   
    supervisorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      required: [true, "Please enter category"],
    },

    status: {
      type: String,
      required: [true, "Please enter status"],
    },
  
    dateFiled: {
      type: Date,
      default: Date.now,
    },   

    dateReviewed: {
      type: Date,
      default: Date.now,
    },

    _response: {
      type: String,
      required: [true, "Please enter response"],
    },

  },
  { timestamps: true }
);

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;
