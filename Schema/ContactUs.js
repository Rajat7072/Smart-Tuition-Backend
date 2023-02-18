const mongoose = require("mongoose");
const { Schema } = mongoose;

const Contact_Us = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobileNum: {
    type: String,
    required: true,
  },
  emailAdd: {
    type: String,
    required: true,
  },
});

const contactusDetail = mongoose.model("ContactUs", Contact_Us);
module.exports = contactusDetail;
