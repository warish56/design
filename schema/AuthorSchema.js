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

  expreience: {
    type: Number,
    default: 0
  }
});

const Author = mongoose.model("authors", AuthorSchema);

module.exports = Author;
