const validate = require("./BodyValidation");
//  usualyy checks if the route has query parameter of type

validateAuthType = () => {
  return (req, res, next) => {
    try {
      if (!req.query.type) {
        res.status(404).send("No Type Found");
        return;
      }
      if (!(req.query.type === "author" || req.query.type === "user")) {
        res.status(400).send("Invalid Auth Type");
        return;
      }
      next();
    } catch (er) {
      res.status(500).send("Internal Server error");
      return;
    }
  };
};

module.exports = validateAuthType;
