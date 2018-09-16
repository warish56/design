const mongoose = require("mongoose");

validateMongooseId = () => {
  return (req, res, next) => {
    if (!req.params.id) {
      res.status(404).send("No Id Found");
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).send("Invalid Id");
      return;
    }
    next();
  };
};

module.exports = validateMongooseId;
