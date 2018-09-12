const mongoose = require("mongoose");
validateId = id => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = validateId;
