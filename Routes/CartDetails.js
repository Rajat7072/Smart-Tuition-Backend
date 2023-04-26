const express = require("express");
const router = express.Router();
const teacherCartDetail = require("../Schema/TeacherCartDetails");
const { body, validationResult } = require("express-validator");

router.post(
  "/teacher-cart",
  [
    body("studentName", "Minimum 3 characters are allowed").isLength({
      min: 3,
      max: 50,
    }),
    body("studentPhone", "Please Enter a valid Mobile Number").isLength({
      min: 10,
      max: 10,
    }),
    body("teacherDetails", "Please Enter valid demo teacher list")
      .isArray()
      .isLength({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        res.status(404).send(errors);
        console.log(errors);
      } else {
        const { studentName, studentPhone, teacherDetails } = req.body;
        const CartDetail = await teacherCartDetail
          .create({
            studentName,
            studentPhone,
            teacherDetails,
          })
          .then((CartDetail) => res.send({ success: true }))
          .catch((err) =>
            res.send({
              errors: err,
              success: false,
              Error: err.message,
            })
          );
      }
    } catch (error) {
      res.status(500).send(`Server Error ${error.message}`);
    }
  }
);
module.exports = router;
