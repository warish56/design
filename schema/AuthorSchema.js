const mongoose = require("mongoose");
const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    minlength: 10
  },
  phone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  experience: {
    type: Number,
    default: 0,
    min: 0
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  confirm: {
    type: Boolean,
    default: false
  }
});

const Author = mongoose.model("authors", AuthorSchema);

module.exports = Author;
