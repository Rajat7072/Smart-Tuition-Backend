const express = require("express");
const router = express.Router();
const signUpDetails = require("../Schema/SignUp");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { body, validationResult, check } = require("express-validator");

router.post(
  "/teacher-signup",
  [
    body("firstName", "Minimum 3 characters are allowed").isLength({ min: 3 }),
    body("Signemail", "Please Enter a valid Email Address").isEmail(),
    body("mobileNumber", "Please Enter a valid Mobile Number")
      .isLength({
        min: 10,
        max: 10,
      })
      .isNumeric(),
    check("Signpassword")
      .isLength({ min: 8 })
      .withMessage("must be at least 8 chars long")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,15})/)
      .withMessage(
        "must be Aphanumeric with one uppercase letter should contain one speacial character"
      ),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //console.log(errors);
    try {
      if (!errors.isEmpty()) {
        res.status(404).send(errors);
        //console.log(errors);
      } else {
        const { firstName, lastName, Signemail, mobileNumber, Signpassword } =
          req.body;
        let user = await signUpDetails.findOne({ Signemail });
        let userMobile = await signUpDetails.findOne({ mobileNumber });
        if (user) {
          res.send({
            success: false,
            value: "User Already Exist Please Login",
          });
          return;
        } else if (userMobile) {
          res.send({
            success: false,
            value: "User Already Exist Please Login",
          });
          return;
        }
        var salt = bcrypt.genSaltSync(10);
        var securePassword = await bcrypt.hash(Signpassword, salt);
        //const data = signUpDetails._id;
        const SignupDetails = await signUpDetails.create({
          firstName,
          lastName,
          Signemail,
          mobileNumber,
          Signpassword: securePassword,
        });
        const data = {
          val_id: SignupDetails._id,
        };
        const token = jwt.sign(data, process.env.REACT_APP_SECRET_KEY);
        res.send({ success: true, token });
      }
    } catch (error) {
      //console.log(`catch Error : ${error}`);
      res.status(500).send(`Server Error : ${error.message}`);
    }
  }
);

module.exports = router;
