const mongoose = require("mongoose");
const { Schema } = mongoose;

const TeacherCartDetails = new Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentPhone: {
    type: String,
    required: true,
    unique: true,
  },
  teacherDetails: {
    type: Array,
    required: true,
  },
});

const TeacherCartDetail = mongoose.model(
  "teacherCartDetail",
  TeacherCartDetails
);
module.exports = TeacherCartDetail;
