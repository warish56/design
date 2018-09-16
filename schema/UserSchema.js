const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
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

const User = mongoose.model("users", UserSchema);

module.exports = User;
