// const http = require("http");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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
    tokens: [{ token: { type: String, required: true } }],
  },
  {
    collection: "user-credentials",
  }
);
const Model = mongoose.model("UserCredentials", User);

const Menu = new mongoose.Schema(
  {
    itemname: { type: String, required: true },
    ingredients: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    inputfile: { type: String, required: true },
  },
  {
    collection: "menu-crud",
  }
);
const MenuModel = mongoose.model("MenuCrud", Menu);

//Database Connection

mongoose.connect("mongodb://localhost:27017/food-delivery-app");

//----------------Routes---------------

//signup test
app.post("/signup", async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.signuppassword, 10);
    const newConfirmPassword = await bcrypt.hash(
      req.body.signupconfirmpassword,
      10
    );
    await Model.create({
      signupemail: req.body.signupemail,
      signuppassword: newPassword,
      signupconfirmpassword: newConfirmPassword,
    });
    res.status(200).send("Registered Successfully!");
  } catch (error) {
    res.status(409).send({
      status: "not ok",
      statusCode: 400,
      message: "Duplicate Email!",
    });
    console.log(error);
  }
});

//Login Route

app.post("/login", async (req, res) => {
  // console.log(req.body);

  try {
    const user = await Model.findOne({
      signupemail: req.body.loginemail,
    });

    const isPasswordValid = await bcrypt.compare(
      req.body.loginpassword,
      user.signuppassword
    );

    const token = jwt.sign({ user }, "Thisismywebsitesecretkey", {
      expiresIn: "300s",
    });

    // if (user) {
    //   const token = jwt.sign(
    //     {
    //       signupemail: req.body.loginemail,
    //       signuppassword: req.body.loginpassword,
    //     },
    //     "secret123"
    //   );
    if (isPasswordValid) {
      res.status(200).send({
        status: "ok",
        user: user,
        token: token,
        message: "User Found",
      });
    } else {
      res.send({ user: false, message: "User Not Found" });
    }
  } catch (err) {
    res.send("Error: " + err);
  }
  // res.send("asd");
});

app.post("/AdminDashboard", verifyToken, (req, res) => {});

//MENU CRUD

app.post("/AdminDashboard/Menu", async (req, res) => {
  try {
    await MenuModel.create({
      itemname: req.body.itemname,
      ingredients: req.body.ingredients,
      price: req.body.price,
      inputfile: req.body.inputfile,
    });
    res.status(200).send("Success");
  } catch (error) {
    res.status(409).send({
      status: "not ok",
      statusCode: 400,
      message: "Not Added",
    });
    console.log(error);
  }
});

// Get Menu List

app.get("/AdminDashboard/MenuList", async (req, res) => {
  try {
    const menu = await MenuModel.find({});
    res.status(200).send(menu);
  } catch (error) {
    res.status(409).send({
      status: "not sent",
    });
  }
});

// Delete MenuList
app.delete("/AdminDashboard/MenuList:_id", async (req, res) => {
  try {
    const menu = await MenuModel.deleteOne(req.params);
    res.status(200).send(menu);
  } catch (error) {
    res.status(409).send({
      status: "not deleted",
    });
  }
});

function verifyToken(req, res, next) {}
app.listen(8080, () => {
  console.log("The server is running on port 8080");
});
