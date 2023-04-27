const express = require("express");
const router = express.Router();
const studentDetails = require("../Schema/Detail");
const { body, validationResult, check } = require("express-validator");
//I am checking git
router.post(
  "/student-detail",
  [
    body("subject", "Please Enter a valid Subject").isLength(),
    body("class_val", "Please Enter a valid Class").isLength(),
    body("board", "Please Enter a valid board").isLength(),
    body("zip_address", "Please Enter a valid zip address").isObject({
      min: 4,
      max: 7,
    }),
    body("school", "Please Enter a valid school").isLength(),
    body("student_name", "Please Enter a valid student name").isLength({
      min: 3,
    }),
    body("mobile_number", "Please Enter a valid mobile number").isLength({
      min: 10,
      max: 10,
    }),
    body("email", "Please Enter a valid email").isEmail().normalizeEmail(),
    body("gender", "Please Enter a valid gender").isLength(),
    body(
      "classes_in_a_weak",
      "Please Enter a valid classes in a weak"
    ).isLength({
      min: 3,
      max: 25,
    }),
    check("day_preference", "Please Enter a valid day preference")
      .isArray({ min: 1, max: 7 })
      .notEmpty(),
    body("time_preference", "Please Enter a valid time preference").isLength(),
    body("slot_preference", "Please Enter a valid slot preference").isLength(),
    body("age_of_taecher", "Please Enter a valid age of taecher").isLength(),
    body(
      "gender_of_taecher",
      "Please Enter a valid gender of taecher"
    ).isLength(),
    body("Monthly_Fees", "Please Enter Monthly Fees").isLength({ min: 1 }),
    body(
      "remark_if_any",
      "Please Enter valid remark length defined is 500"
    ).isLength({ max: 500 }),
    body(
      "taecher_qualification_detail",
      "Qualification Details are high"
    ).isLength({ max: 50 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        res.status(404).send(errors);
        //console.log(errors);
      } else {
        const {
          subject,
          class_val,
          board,
          zip_address,
          school,
          student_name,
          mobile_number,
          email,
          gender,
          classes_in_a_weak,
          day_preference,
          time_preference,
          slot_preference,
          age_of_taecher,
          gender_of_taecher,
          taecher_qualification_detail,
          remark_if_any,
          Monthly_Fees,
        } = req.body;
        const Details = await studentDetails
          .create({
            subject,
            class_val,
            board,
            zip_address,
            school,
            student_name,
            mobile_number,
            email,
            gender,
            classes_in_a_weak,
            day_preference,
            time_preference,
            slot_preference,
            age_of_taecher,
            gender_of_taecher,
            taecher_qualification_detail,
            remark_if_any,
            Monthly_Fees,
          })
          .then((studentDetails) => res.json({ success: true }))
          .catch((err) =>
            res.json({
              errors: err,
              success: false,
              error: "Some BAD Ocurred",
            })
          );
      }
    } catch (error) {
      res.status(500).send(`Server Error : ${error.message}`);
    }
  }
);

module.exports = router;
