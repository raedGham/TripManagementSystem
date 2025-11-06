const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {

    paymentDate: {
        type: Date,
        required: [true, "Please enter Payment Date"],

    },    

    numberOfPeople: {
      type: Number,
      default: 1,
    },

    paymentMethod: {
      type: String,
      enum: ["credit card", "check", "cash"],
      required: [true, "Please select payment method"],
      default: "cash",
    },     
    
    reservationID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
      required: true,
    },    

  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
