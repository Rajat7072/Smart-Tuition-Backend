const mongoose = require("mongoose");
const { Schema } = mongoose;

const Details_Student = new Schema({
  subject: {
    type: String,
    require: true,
  },
  class_val: {
    type: String,
    require: true,
  },
  board: {
    type: String,
    require: true,
  },
  zip_address: {
    type: Object,
    require: true,
  },
  school: {
    type: String,
    require: true,
  },
  student_name: {
    type: String,
    require: true,
  },
  mobile_number: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  classes_in_a_weak: {
    type: String,
    require: true,
  },
  day_preference: {
    type: Array,
    require: true,
  },
  time_preference: {
    type: String,
    require: true,
  },
  slot_preference: {
    type: String,
    require: true,
  },
  age_of_taecher: {
    type: String,
    require: true,
  },
  gender_of_taecher: {
    type: String,
    require: true,
  },
  taecher_qualification_detail: {
    type: String,
  },
  remark_if_any: {
    type: String,
  },
  Monthly_Fees: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const StudentDetail = mongoose.model("StudentDetail", Details_Student);
module.exports = StudentDetail;
