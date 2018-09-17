const validate = require("./BodyValidation");

validateOrder = () => {
  return (req, res, next) => {
    try {
      req.errors = [
        ...new validate("Author", req.body.author)
          .required()
          .isId()
          .isValid(),
        ...new validate("User", req.body.user)
          .required()
          .isId()
          .isValid(),
        ...new validate("Design", req.body.design).required().isValid()
      ];

      if (req.errors.length > 0) return res.status(400).send(req.errors[0]);
      else next();
    } catch (er) {
      return res.status(500).send("Internal Server error");
    }
  };
};

module.exports = validateOrder;
