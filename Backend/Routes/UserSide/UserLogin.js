const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const UserPanelModel = require("./../../Models/UserPanelModel");

router.post("/", async (req, res) => {
  try {
    const user = await UserPanelModel.findOne({
      email: req.body.email,
    });
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    const token = await user.generateAuthToken();
    if (isPasswordValid) {
      res
        .status(200)
        .send({ user: user, token: token, message: "Logged In Successfully!" });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  } catch (error) {
    res.status(400).send({ status: "not ok", message: error });
  }
});

module.exports = router;
