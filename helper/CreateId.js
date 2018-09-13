const mongoose = require("mongoose");
createId = () => {
  return new mongoose.Types.ObjectId();
};

module.exports = createId;
