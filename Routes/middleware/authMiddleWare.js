var jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
  const token = req.header("auth-token");
  //console.log("Token", token);
  if (!token) {
    res.status(401).send("Authorisation denied Auth_Token_Fail_Error_Msg");
  } else {
    try {
      const decode = jwt.verify(token, process.env.REACT_APP_SECRET_KEY);
      if (!decode) {
        res.status(401).send("Verification denied");
      } else {
        req.userIDDetail = decode.val_id;
        //console.log("Decoded", decode.val_id);
        //console.log("userId", decode);
        next();
      }
    } catch (error) {
      //console.log(error);
      res.status(500).send(`Server Error : ${error.message}`);
    }
  }
};
module.exports = authMiddleWare;
