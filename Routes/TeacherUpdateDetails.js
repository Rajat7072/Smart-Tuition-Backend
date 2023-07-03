const express = require("express");
const router = express.Router();
const teacherDetails = require("../Schema/TeacherDetail");
const { body, validationResult } = require("express-validator");
const authMiddleWare = require("./middleware/authMiddleWare");
const SignupDetails = require("../Schema/SignUp");

router.put(
  "/teacher-details-update",
  authMiddleWare,
  [
    body("profileName", "Please Provide a Profile Name").isLength({ min: 2 }),
    //body("profilepicimg", "Please Provide a Profile Picture").isLength(),
    body("DOB", "Please Enter A valid Date")
      .matches(/^\d{4}-\d{2}-\d{2}$/)
      .isDate()
      .isBefore(),
    body("TGender", "Please Enter a Valid Gender").isLength(),
    body("Add", "Please Enter a Valid Address").isLength(),
    body("Qualification", "Please Enter a Valid Qualification").isLength(),
    body("TSubject", "Please Enter a Valid Subject").isLength(),
    body("AadharCardNum", "Please Enter a Valid AadharCardNum").isLength({
      max: 20,
    }),
    body("FeeAsked", "Please Enter a Valid Fees").isLength(),
    body("TeacherMobile", "Please Enter a Valid Mobile Number").isLength({
      min: 10,
      max: 10,
    }),
    body("TeacherExperiance", "Please Enter a Valid Fees").isLength(),
    body("TClasses", "Please Enter a Valid Fees").isLength(),
    body("TeacherAbout", "Max description allowed is 100 letters").isLength({
      max: 100,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        res.status(404).send(errors);
        //console.log(errors);
      } else {
        const {
          profileName,
          profilepicimg,
          DOB,
          TGender,
          Add,
          Qualification,
          TSubject,
          TClasses,
          AadharCardNum,
          FeeAsked,
          TeacherMobile,
          TeacherExperiance,
          TeacherAbout,
        } = req.body;
        const newUpdatedDetails = {};
        if (profileName) newUpdatedDetails.profileName = profileName;
        if (profilepicimg) newUpdatedDetails.profilepicimg = profilepicimg;
        if (DOB) newUpdatedDetails.DOB = DOB;
        if (TGender) newUpdatedDetails.TGender = TGender;
        if (Add) newUpdatedDetails.Add = Add;
        if (Qualification) newUpdatedDetails.Qualification = Qualification;
        if (TSubject) newUpdatedDetails.TSubject = TSubject;
        if (TClasses) newUpdatedDetails.TClasses = TClasses;
        if (AadharCardNum) newUpdatedDetails.AadharCardNum = AadharCardNum;
        if (FeeAsked) newUpdatedDetails.FeeAsked = FeeAsked;
        if (TeacherMobile) newUpdatedDetails.TeacherMobile = TeacherMobile;
        if (TeacherExperiance)
          newUpdatedDetails.TeacherExperiance = TeacherExperiance;
        if (TeacherAbout) newUpdatedDetails.TeacherAbout = TeacherAbout;
        const findId = await SignupDetails.findById(req.userIDDetail);
        if (!findId) {
          return res
            .status(404)
            .send("You are not Authourised to Perform this Action");
        } else if (findId._id.toString() !== req.userIDDetail) {
          return res.status(404).send("Please Do Not Disturb other's Details.");
        } else {
          const TeacherDetail = await teacherDetails
            .findOneAndUpdate(
              { user: req.userIDDetail },
              { $set: newUpdatedDetails },
              { new: true }
            )
            .then((TeacherDetail) => res.send({ success: true }))
            .catch((err) =>
              res.send({
                errors: err,
                success: false,
                Error: err.message,
              })
            );
        }
      }
    } catch (error) {
      res.status(500).send(`Server Error : ${error.message}`);
    }
  }
);
module.exports = router;
