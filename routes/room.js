var express = require("express");
var router = express.Router();
const Room = require("../models/RoomDetails");

router.post("/create", async (req, res) => {
  try {
    const { name } = req.body;
    const newRoom = new Room({ name });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ message: "Failed to create room." });
  }
});

module.exports = router;
