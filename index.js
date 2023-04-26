const express = require("express");
const connectDB = require("./db");
const app = express();
const port = 8089;
const DetailRoute = require("./Routes/DetailRoute");
const ContactusRoute = require("./Routes/ContactusRoute");
const SignupRoute = require("./Routes/SignupRoute");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
var cors = require("cors");
var colors = require("colors");
const TeacherDetailRoute = require("./Routes/TeacherDetailRoute");
const LoginRoute = require("./Routes/LoginRoute");
const TeacherMap = require("./Routes/TeacherMapDetails");
const CartDetail = require("./Routes/CartDetails");

dotenv.config();
app.use(cors());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    parameterLimit: 50000,
    limit: "5mb",
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/details", DetailRoute);
app.use("/api/contact", ContactusRoute);
app.use("/api/teacher", SignupRoute);
app.use("/api/detail", TeacherDetailRoute);
app.use("/api/login", LoginRoute);
app.use("/api/teacherDetail", TeacherMap);
app.use("/api/teacherCart", CartDetail);

app.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port http://localhost:${port}`.america);
});
