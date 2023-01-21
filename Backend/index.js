// const http = require("http");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
mongoose.set("strictQuery", false);
const Model = require("./Models/UserModel");
const ContactModel = require("./Models/ContactUs");
const MenuModel = require("./Models/MenuModel");
const auth = require("./Middlewares/Auth");
const multer = require("multer");

const app = express();
app.use("/public", express.static("public"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Math.random().toString().slice(2, 6) + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });
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
    res.send({
      status: "ok",
      statusCode: 200,
      message: "Registered Successfully!",
    });
  } catch (error) {
    res.send({
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

    const token = await user.generateAuthToken();
    // res.cookie("jwttoken", token, {
    //   expires: new Date(Date.now() + 250000000),
    //   httpOnly: true,
    // });
    // localStorage.setItem("jwttoken", token);

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

//MENU CRUD

//Add Menu
app.post(
  "/AdminDashboard/Menu",
  upload.single("inputfile"),
  auth,
  async (req, res) => {
    try {
      await MenuModel.create({
        itemname: req.body.itemname,
        ingredients: req.body.ingredients,
        price: req.body.price,
        inputfile: req.file ? req.file.filename : null,
      });
      res.status(200).send({
        status: "ok",
        message: "Successfully Added",
      });
    } catch (error) {
      res.status(409).send({
        status: "not ok",
        statusCode: 400,
        message: "Not Added",
      });
      console.log(error);
    }
  }
);

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
// get MenuList with parameters
app.get("/AdminDashboard/MenuList:_id", async (req, res) => {
  try {
    const menu = await MenuModel.findOne(req.params);
    res.status(200).send(menu);
    // console.log(menu);
  } catch (error) {
    res.status(409).send({
      status: "not shown",
    });
  }
});

// Delete MenuList
app.delete("/AdminDashboard/MenuList:_id", async (req, res) => {
  try {
    const menu = await MenuModel.deleteOne(req.params);
    res.status(200).send({ status: "Deleted Successfully!" });
  } catch (error) {
    res.status(409).send({
      status: "not deleted",
    });
  }
});

// ContactUs Post
app.post("/contact", async (req, res) => {
  try {
    await ContactModel.create({
      name: req.body.name,
      subject: req.body.subject,
      message: req.body.message,
    });
    res
      .status(200)
      .send({ status: "ok", message: "Successfully Sent Message" });
  } catch (error) {
    res.status(409).send({ status: "error", message: error });
  }
});

// ContactUs Get
app.get("/contactmessages", async (req, res) => {
  try {
    const contact = await ContactModel.find({});
    res.status(200).send(contact);
  } catch (error) {
    res.status(409).send({ status: "not ok", message: error });
  }
});

// function verifyToken(req, res, next) {}
app.listen(8080, () => {
  console.log("The server is running on port 8080");
});
