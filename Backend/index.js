const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
mongoose.set("strictQuery", false);
const auth = require("./Middlewares/Auth");

//Importing Routes
const loginRoute = require("./Routes/AdminSide/Login");
const signupRoute = require("./Routes/AdminSide/Signup");
const adminDashboardRoute = require("./Routes/AdminSide/AdminDashboard");
const contactRoute = require("./Routes/UserSide/Contact");
const orderRoute = require("./Routes/UserSide/Order");

const app = express();
app.use("/public", express.static("public"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/food-delivery-app");

//----------------Routes---------------

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/AdminDashboard", adminDashboardRoute, auth);
app.use("/contact", contactRoute);
app.use("orders", orderRoute);

app.listen(8080, () => {
  console.log("The server is running on port 8080");
});
