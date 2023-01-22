const express = require("express");
const router = express.Router();
const multer = require("multer");
const MenuModel = require("./../../Models/MenuModel");
const ContactModel = require("./../../Models/ContactUs");
const OrderModel = require("./../../Models/Orders");

// app.use("/public", express.static("public"));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Math.random().toString().slice(2, 6) + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/Menu",
  upload.single("inputfile"),

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

router.get("/MenuList", async (req, res) => {
  try {
    const menu = await MenuModel.find({});
    res.status(200).send(menu);
  } catch (error) {
    res.status(409).send({
      status: "not sent",
    });
  }
});

router.get("/MenuList:_id", async (req, res) => {
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

router.delete("/MenuList:_id", async (req, res) => {
  try {
    const menu = await MenuModel.deleteOne(req.params);
    res.status(200).send({ status: "Deleted Successfully!" });
  } catch (error) {
    res.status(409).send({
      status: "not deleted",
    });
  }
});

router.get("/Contact", async (req, res) => {
  try {
    const contact = await ContactModel.find({});
    res.status(200).send(contact);
  } catch (error) {
    res.status(409).send({ status: "not ok", message: error });
  }
});

router.get("/MyOrders", async (req, res) => {
  try {
    const order = await OrderModel.find({});
    res.status(200).send(order);
  } catch (error) {
    res.status(409).send(error);
  }
});

module.exports = router;
