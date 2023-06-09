const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const teacher_delete = require("../Schema/TeacherDetail");
const teacher_signup = require("../Schema/SignUp");
const authMiddleWare = require("./middleware/authMiddleWare");

router.delete("/techerDelete", authMiddleWare, async (req, res) => {
  //console.log("Teacher Delete");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send(errors.array());
  } else {
    try {
      const userID = req.userIDDetail;
      const resultID = await teacher_delete.findOne({ user: userID });
      //console.log(resultID);
      if (!resultID) {
        res
          .status(401)
          .send({ success: false, message: "userId does not Exist" });
      } else {
        const result = await teacher_delete.findOneAndDelete({ user: userID });
        const resultSignup = await teacher_signup.findByIdAndDelete({
          _id: userID,
        });
        //console.log(resultSignup);
        if (result && resultSignup) {
          res
            .status(200)
            .send({ success: true, message: "Profile Deleted Successfully" });
        } else {
          res
            .status(200)
            .send(
              "Profile Delete Actions can not performed now Please mail us."
            );
        }
      }
    } catch (error) {
      res.status(400).send("Server Error");
    }
  }
});
module.exports = router;
