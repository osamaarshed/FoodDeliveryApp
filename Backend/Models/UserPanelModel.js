// const mongoose = require("mongoose");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmpassword: { type: String, required: true },
    tokens: [{ token: { type: String, required: true } }],
  },
  {
    collection: "userpanel-credentials",
  }
);

User.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, "thisistheseckretkey", {
      expiresIn: "1h",
    });
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.error(error);
  }
};
const Model = mongoose.model("UserPanelCredentials", User);
module.exports = Model;
