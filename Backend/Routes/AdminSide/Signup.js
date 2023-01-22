const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Model = require("./../../Models/UserModel");

router.post("/", async (req, res) => {
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
module.exports = router;
