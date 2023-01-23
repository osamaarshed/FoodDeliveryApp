const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const UserPanelModel = require("./../../Models/UserPanelModel");

router.post("/", async (req, res) => {
  try {
    const Password = await bcrypt.hash(req.body.password, 10);
    const ConfirmPassword = await bcrypt.hash(req.body.confirmpassword, 10);
    await UserPanelModel.create({
      email: req.body.email,
      password: Password,
      confirmpassword: ConfirmPassword,
    });
    res.status(200).send({ message: "User Created Successfully!" });
  } catch (error) {
    res.status(400).send({ status: "not ok", message: "User Already Exist" });
  }
});
module.exports = router;
