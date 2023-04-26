const mongoose = require("mongoose");
const { Schema } = mongoose;

const Details_Signup = new Schema({
  
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  Signemail: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  Signpassword: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const SignupDetails = mongoose.model("SignupDetails", Details_Signup);
module.exports = SignupDetails;
