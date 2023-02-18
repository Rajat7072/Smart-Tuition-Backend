const express = require("express");
const router = express.Router();
const contactusDetail = require("../Schema/ContactUs");
const { body, validationResult } = require("express-validator");

router.post(
  "/contactus",
  [
    body("name", "Please Enter a valid name of length more than 3").isLength({
      min: 3,
    }),
    body("mobileNum", "Please Enter a valid Mobile Number")
      .isLength({
        min: 10,
        max: 10,
      })
      .isNumeric()
      .isMobilePhone(),
    body("emailAdd", "Please Enter a Valid Email Address").isEmail().isLength(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        res.status(404).send(errors);
        console.log(errors);
      } else {
        const { name, mobileNum, emailAdd } = req.body;
        const Details = await contactusDetail
          .create({
            name,
            mobileNum,
            emailAdd,
          })
          .then((Details) => res.json({ success: true }))
          .catch((err) =>
            res.json({
              errors: err,
              success: false,
              error: "Internal Server Error",
            })
          );
      }
    } catch (error) {
      console.log("catch Error");
      res.status(500).send(`Server Error : ${error.message}`);
    }
  }
);
module.exports = router;
