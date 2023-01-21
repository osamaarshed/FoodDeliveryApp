const mongoose = require("mongoose");

const Contact = new mongoose.Schema(
  {
    name: { type: "string", required: true },
    subject: { type: "string", required: true },
    message: { type: "string", required: true },
  },
  { collections: "contact-us" }
);
const ContactModel = mongoose.model("ContactUs", Contact);
module.exports = ContactModel;
