const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Model = require("./../../Models/UserModel");

router.post("/", async (req, res) => {
  try {
    const user = await Model.findOne({
      signupemail: req.body.loginemail,
    });

    const isPasswordValid = await bcrypt.compare(
      req.body.loginpassword,
      user.signuppassword
    );

    const token = await user.generateAuthToken();

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
});

module.exports = router;
