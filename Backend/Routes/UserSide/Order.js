const express = require("express");
const router = express.Router();
const OrderModel = require("./../../Models/Orders");

router.post("/", async (req, res) => {
  try {
    await OrderModel.create({
      productId: req.body.productId,
      productName: req.body.productName,
      productPrice: req.body.productPrice,
      productQuantity: req.body.productQuantity,
    });
    res.status(200).send({
      status: "Ok",
      message: "Your Order has been successfully processed!",
    });
  } catch (error) {
    res.status(409).send(error);
  }
});

module.exports = router;
