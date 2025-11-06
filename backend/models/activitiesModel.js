const mongoose = require("mongoose");

const activitySchema = mongoose.Schema(
  {
    name: {
      type: String,      
      required: [true, "Please enter activity name"],
    },

    description: {
      type: String,
      required: [true, "Please enter description"],
    },

    startDate: {
      type: Date,
      required: [true, "Please enter activity start date"],
    },

    finishDate: {
      type: Date,
      required: [true, "Please enter activity finish date"],
    },

    capacity: {
      type: Number,
      default: 1,
    },

    costPerPerson: {
      type: Number,
      required: [true, "Please enter cost Per Person"],
    },


    tripID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
