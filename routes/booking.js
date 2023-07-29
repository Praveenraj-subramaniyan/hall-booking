var express = require("express");
var router = express.Router();
const Booking = require("../models/BookingDetails");

router.post("/create", async (req, res) => {
  try {
    const { name } = req.body;
    const newBooking = new Booking({ name });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ message: "Failed to book a room." });
  }
});

module.exports = router;
