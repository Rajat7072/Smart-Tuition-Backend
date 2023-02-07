const mongoose = require("mongoose");
var colors = require("colors");
mongoose.set("strictQuery", false);

const ConnectToMongo = async () => {
  //console.log(process.env.REACT_APP_CONN_URL);
  try {
    const conn = mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB connected successfully To Port ${process.env.MONGO_URI}`
        .rainbow
    );
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = ConnectToMongo;
