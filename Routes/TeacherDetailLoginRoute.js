const express = require("express");
const { validationResult } = require("express-validator");
const authMiddleWare = require("./middleware/authMiddleWare");
const router = express.Router();
const teacher_Login_Details = require("../Schema/TeacherDetail");

router.get("/getTeacherLoginDetails", authMiddleWare, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send(errors.array());
  } else {
    try {
      //console.log("Enter");
      let userID = req.userIDDetail;
      //console.log(userID);
      let result = await teacher_Login_Details.findOne({ user: userID });
      //console.log("Serverside", result);
      res.status(200).send(result);
    } catch (error) {
      //console.log("failed here");
      res.status(400).send("authVerification Failed");
    }
  }
});
module.exports = router;
