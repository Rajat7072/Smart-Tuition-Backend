const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const details_of_requirement = require("../Schema/Detail");

router.get("/studentRequirementMap", [], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(500).send(errors.array());
  } else {
    try {
      let detail_data_student_requirement = await details_of_requirement
        .find({})
        .select("-mobile_number -email");
      res.json(detail_data_student_requirement.reverse());
    } catch (error) {
      //console.log(error.message);
      res.status(404).send("Data not found");
    }
  }
});

module.exports = router;
