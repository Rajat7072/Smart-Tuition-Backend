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
const studentRequirementMap = require("./Routes/StudentDetailsRoute");
const teacherDetailLoginRoute = require("./Routes/TeacherDetailLoginRoute");
const deleteTeacher = require("./Routes/DeleteTeacher");
const updateTeacher = require("./Routes/TeacherUpdateDetails");

// const corsOptions = {
//   origin: process.env.REACT_APP_LOCALURL,
// };
dotenv.config();
//app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    parameterLimit: 50000,
    limit: "5mb",
  })
);

app.use((req, res, next) => {
  const allowedOrigins = [
    process.env.REACT_APP_LOCALURL,
    process.env.REACT_APP_LOCALURL_SERVER,
    process.env.REACT_APP_LOCALURL_WORLD,
    process.env.REACT_APP_LOCALURL_WORLD_CERT,
  ];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

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
app.use("/api/requirement", studentRequirementMap);
app.use("/api/teacherLogin", teacherDetailLoginRoute);
app.use("/api/delete", deleteTeacher);
app.use("/api/detailsUpdate", updateTeacher);

app.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port http://localhost:${port}`.america);
});
