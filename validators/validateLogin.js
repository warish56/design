const validate = require("./BodyValidation");

validateLogin = () => {
  return (req, res, next) => {
    try {
      req.errors = [
        ...new validate("Email", req.body.email).required().isValid(),
        ...new validate("Password", req.body.password)
          .required()
          .minlength(6)
          .isValid()
      ];

      if (req.errors.length > 0) return res.status(400).send(req.errors[0]);
      else next();
    } catch (er) {
      return res.status(500).send("Internal Server error");
    }
  };
};

module.exports = validateLogin;
