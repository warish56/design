const mongoose = require("mongoose");
const LogoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    minlength: 10
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authors",
    required: true
  },
  likes: {
    type: Number,
    min: 0,
    default: 0
  },
  tag: {
    type: Array,
    required: true,
    validate: {
      validator: function(val) {
        return val.length > 0;
      },
      message: "A tag must be provided"
    }
  },
  image: {
    type: String,
    required: true
  }
});

const Logo = mongoose.model("logos", LogoSchema);

module.exports = Logo;
