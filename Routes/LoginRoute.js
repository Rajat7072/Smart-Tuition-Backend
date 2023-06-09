const express = require("express");
const router = express.Router();
const { check, body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const SignupDetails = require("../Schema/SignUp");

router.post(
  "/login-details",
  [
    body("Signemail", "Please Enter A valid Email").isEmail(),
    check("Signpassword").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        res.status(404).send(errors);
      } else {
        const { Signemail, Signpassword } = req.body;
        //console.log(Signemail, Signpassword);
        const userFound = await SignupDetails.findOne({ Signemail });
        //console.log(userFound);
        if (!userFound) {
          //console.log("User Not found");
          res.status(200).send({
            success: false,
            message: "Incorrect UserName or Password",
          });
        } else {
          //console.log("Mandatory", Signpassword, userFound);
          let checkPassword = await bcrypt.compare(
            Signpassword,
            userFound.Signpassword
          );
          if (!checkPassword) {
            res.status(200).send({
              success: false,
              message: "Incorrect UserName or Password",
            });
          } else {
            //console.log("Now you are Here");
            const data = {
              val_id: userFound._id,
            };
            //console.log(data.val_id);
            const token = jwt.sign(data, process.env.REACT_APP_SECRET_KEY);
            console.log(token);
            res.status(200).send({ success: true, token });
          }
        }
      }
    } catch (error) {
      //console.log(error);
      res.status(500).send(`Server Error : ${error.message}`);
    }
  }
);
module.exports = router;