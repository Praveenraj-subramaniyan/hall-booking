const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    roomId: {
        type: String,
        required: true,
    },
  },
  { collection: "Booking" }
);

const BookingDetails = mongoose.model("Booking", BookingSchema);

module.exports = BookingDetails;
