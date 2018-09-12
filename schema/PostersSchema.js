const mongoose = require("mongoose");
const PosterSchema = new mongoose.Schema({
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
    type: Number
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
  }
});

const Poster = mongoose.model("posters", PosterSchema);

module.exports = Poster;
