var express = require("express");
var router = express.Router();
const Mentor = require("../models/MentorDetails");
const Student = require("../Models/StudentDetails");

router.post("/create", async (req, res) => {
  try {
    const { name } = req.body;
    const newMentor = new Mentor({ name });
    await newMentor.save();
    res.status(201).json(newMentor);
  } catch (err) {
    res.status(500).json({ message: "Failed to create mentor." });
  }
});

router.post("/assign-students/:mentorId", async (req, res) => {
  try {
    const mentorId = req.params.mentorId;
    const { studentIds } = req.body;
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found." });
    }
    for (const studentId of studentIds) {
      const student = await Student.findById(studentId);
      if (student && !student.mentor) {
        student.mentor = {
          id: mentor._id,
          name: mentor.name,
        };
        await student.save();
      } else if (student && student.mentor) {
        student.PreviousMentor.push(student.mentor);
        student.mentor = {
          id: mentor._id,
          name: mentor.name,
        };
        await student.save();
      }
    }
    res.status(200).json({ message: "Students assigned successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to assign students to mentor." });
  }
});

router.get("/mentor-students/:mentorId", async (req, res) => {
  try {
    const mentorId = req.params.mentorId;
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found." });
    }
    const students = await Student.find({ "mentor.id": mentorId });

    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch data." });
  }
});

module.exports = router;
