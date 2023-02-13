const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
    unique: [true, "This name already exists"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    unique: [true, "This number already exists"],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const ContactSchema = mongoose.model("contact", contactSchema);

module.exports = ContactSchema;