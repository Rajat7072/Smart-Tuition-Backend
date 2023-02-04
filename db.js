const mongoose = require("mongoose");
var colors = require("colors");
mongoose.set("strictQuery", false);

const ConnectToMongo = async () => {
  //console.log(process.env.REACT_APP_CONN_URL);
  try {
    const conn = mongoose.connect(process.env.REACT_APP_CONN_URL);
    console.log(
      `MongoDB connected successfully To Port ${process.env.REACT_APP_CONN_URL}`
        .rainbow
    );
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = ConnectToMongo;
