const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  photo: {
    name: "String",
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
