// const mongoose = require("mongoose");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

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
const model = mongoose.model("UserCredentials", User);
module.exports = model;
