const express = require("express");
const connectDB = require("./db");
const app = express();
const port = 8089;
const DetailRoute = require("./Routes/DetailRoute");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
var cors = require("cors");

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/details", DetailRoute);

app.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port http://localhost:${port}`.america);
});
