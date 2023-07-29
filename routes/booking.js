var express = require("express");
var router = express.Router();
const Booking = require("../models/BookingDetails");

router.post("/create", async (req, res) => {
  try {
    const { customerName, date, startTime, endTime, roomId } = req.body;
    const newBooking = new Booking({ customerName, date, startTime, endTime, roomId });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to book a room." });
  }
});


module.exports = router;
