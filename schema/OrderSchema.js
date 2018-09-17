const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authors",
    required: true
  },

  design: {
    type: String,
    required: true
  }
});

const Orders = mongoose.model("orders", OrderSchema);

module.exports = Orders;
