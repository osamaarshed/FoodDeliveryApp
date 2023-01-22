const mongoose = require("mongoose");

const Orders = mongoose.Schema(
  {
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    productPrice: { type: String, required: true },
    productQuantity: { type: String, required: true },
  },
  {
    collection: "order-details",
  }
);
const OrderDetails = mongoose.model("OrderDetails", Orders);
module.exports = OrderDetails;
