const mongoose = require("mongoose");
const { Schema } = mongoose;

const Teacher_Detail = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "SignupDetails",
    unique: true,
  },
  profileName: {
    type: String,
    required: true,
  },
  profilepicimg: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
    required: true,
  },
  TGender: {
    type: String,
    required: true,
  },
  Add: {
    type: String,
    required: true,
  },
  Qualification: {
    type: String,
    required: true,
  },
  TSubject: {
    type: String,
    required: true,
  },
  TClasses: {
    type: String,
    required: true,
  },
  AadharCardNum: {
    type: String,
    required: true,
  },
  FeeAsked: {
    type: String,
    required: true,
  },
  TeacherMobile: {
    type: String,
    required: true,
  },
  TeacherExperiance: {
    type: String,
    required: true,
  },
  TeacherAbout: {
    type: String,
    required: true,
  },
});

const TeacherkiDetail = mongoose.model("TeacherkiDetail", Teacher_Detail);
module.exports = TeacherkiDetail;
