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
  expreience: {
    type: Number,
    default: 0
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  }
});

const Author = mongoose.model("authors", AuthorSchema);

module.exports = Author;
