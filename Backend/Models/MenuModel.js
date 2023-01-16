const mongoose = require("mongoose");

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
module.exports = MenuModel;
