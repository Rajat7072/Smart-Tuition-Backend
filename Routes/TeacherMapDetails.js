const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const details_of_teacher = require("../Schema/TeacherDetail");

router.get("/teacherMap", [], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(500).send(errors.array());
  }
  try {
    let detail_data = await details_of_teacher
      .find({})
      .select("-TeacherMobile -AadharCardNum");
    res.json(detail_data);
  } catch (error) {
    console.log(error.message);
    res.status(404).send("Data not found");
  }
});

module.exports = router;
