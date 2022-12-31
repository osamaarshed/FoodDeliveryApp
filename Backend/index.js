// const http = require("http");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// import model from "./Models/UserModel";
mongoose.set("strictQuery", false);

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Schemas
const User = new mongoose.Schema(
  {
    signupemail: { type: String, required: true, unique: true },
    signuppassword: { type: String, required: true },
    signupconfirmpassword: { type: String, required: true },
  },
  {
    collection: "user-credentials",
  }
);
const Model = mongoose.model("UserCredentials", User);

//Database Connection

mongoose.connect("mongodb://localhost:27017/food-delivery-app");

//----------------Routes---------------

//Test Route

app.get("/login/test", (req, res) => {
  res.send("akjasdnasdnksja");
});

//Signup Route

// app.post("/signup", async (req, res) => {
//   // res.send(req.body);
//   console.log(req.body);
//   try {
//     await User.create({
//       signupemail: req.body.signupemail,
//       signuppassword: req.body.signuppassword,
//       signupconfirmpassword: req.body.signupconfirmpassword,
//     });
//     if (User.signuppassword === User.signupconfirmpassword) {
//       res.status(200).send("Registered Successfully!");
//     } else {
//       res.status(400).send("Password Didnot Match!");
//     }
//   } catch (error) {
//     res.status(400).send("Duplicate Email!");
//   }
// });

//signup test
app.post("/signup", async (req, res) => {
  try {
    await Model.create({
      signupemail: req.body.signupemail,
      signuppassword: req.body.signuppassword,
      signupconfirmpassword: req.body.signupconfirmpassword,
    });
    res.status(200).send("Registered Successfully!");
  } catch (error) {
    res.status(400).send("Duplicate Email!");
    console.log(error);
  }
});

//Login Route

app.post("/login", async (req, res) => {
  console.log(req.body);
  const user = await Model.findOne({
    signupemail: req.body.loginemail,
    signuppassword: req.body.loginpassword,
  });
  if (user) {
    res.status(200).send("User Found");
  } else {
    res.status(404).send("User not Found");
  }
  // res.send("asd");
});

app.listen(8080, () => {
  console.log("The server is running on port 8080");
});
