const express = require("express");
const router = express.Router();
const ContactModel = require("./../../Models/ContactUs");

router.post("/", async (req, res) => {
  try {
    await ContactModel.create({
      name: req.body.name,
      subject: req.body.subject,
      message: req.body.message,
    });
    res
      .status(200)
      .send({ status: "ok", message: "Successfully Sent Message" });
  } catch (error) {
    res.status(409).send({ status: "error", message: error });
  }
});

module.exports = router;
